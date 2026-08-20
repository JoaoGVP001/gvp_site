import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the personal portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>João Guilherme \| Desenvolvedor<\/title>/i);
  assert.match(html, /Eu transformo/);
  assert.match(html, /curiosidade/);
  assert.match(html, /BookReadNet/);
  assert.match(html, /O que tenho aprendido/);
  assert.match(html, /http:\/\/localhost(?::3000)?\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders shareable detail pages with their own metadata", async () => {
  const [projectResponse, noteResponse] = await Promise.all([
    render("/projetos/bookreadnet"),
    render("/notas/git-basico"),
  ]);
  assert.equal(projectResponse.status, 200);
  assert.equal(noteResponse.status, 200);

  const [projectHtml, noteHtml] = await Promise.all([projectResponse.text(), noteResponse.text()]);
  assert.match(projectHtml, /<title>BookReadNet \| João Guilherme<\/title>/i);
  assert.match(projectHtml, /property="og:title" content="BookReadNet"/i);
  assert.doesNotMatch(projectHtml, /og\.png/);
  assert.match(noteHtml, /<title>Git: o essencial para começar \| João Guilherme<\/title>/i);
  assert.match(noteHtml, /name="twitter:title" content="Git: o essencial para começar"/i);
  assert.doesNotMatch(noteHtml, /og\.png/);
});

test("removes every disposable starter artifact", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
  await access(new URL("public/og.png", templateRoot));
});
