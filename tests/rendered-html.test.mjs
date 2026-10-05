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

test("server-renders support for small businesses", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>João Guilherme \| Suporte de TI em Concórdia SC<\/title>/i);
  assert.match(html, /Suporte de TI para/);
  assert.match(html, /pequenas empresas/);
  assert.match(html, /Solicitar atendimento/);
  assert.doesNotMatch(html, /BookReadNet|GitHub|JoaoGVP001|href="\/projetos/i);
  assert.match(html, /Orientações para sua empresa/);
  assert.match(html, /href="\/laboratorio"/);
  assert.doesNotMatch(html, /static\/chunks\/link-[^"]+\.js/i);
  assert.match(html, /http:\/\/localhost(?::3000)?\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("serves every primary navigation destination", async () => {
  const routes = ["/servicos", "/planos", "/sobre", "/notas", "/laboratorio", "/contato"];
  const responses = await Promise.all(routes.map((route) => render(route)));

  for (const [index, response] of responses.entries()) {
    assert.equal(response.status, 200, `${routes[index]} should render`);
    const html = await response.text();
    assert.doesNotMatch(html, /BookReadNet|GitHub|JoaoGVP001|href="\/projetos/i);
    assert.doesNotMatch(html, /static\/chunks\/link-[^"]+\.js/i);
  }
});

test("renders the interactive laboratory page", async () => {
  const response = await render("/laboratorio");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Laboratório \| João Guilherme<\/title>/i);
  assert.match(html, /Snake_01/);
  assert.match(html, /experimento interativo feito com React e TypeScript/i);
  assert.match(html, /recorde/i);
});

test("notes keep their own shareable metadata", async () => {
  const response = await render("/notas/git-basico");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Git: o essencial para começar \| João Guilherme<\/title>/i);
  assert.match(html, /name="twitter:title" content="Git: o essencial para começar"/i);
  assert.doesNotMatch(html, /og\.png|BookReadNet|GitHub|JoaoGVP001/i);
});

test("removes every disposable starter artifact", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
  await access(new URL("public/og.png", templateRoot));
});

test("commercial pages explain scope and provide a contact request form", async () => {
  const plans = await (await render("/planos")).text();
  assert.match(plans, /SOB CONSULTA/);
  assert.match(plans, /deslocamento/);
  assert.doesNotMatch(plans, /R\$\s*(199|349)/);
  const contact = await (await render("/contato")).text();
  assert.match(contact, /contato@example\.com/);
  assert.match(contact, /Autorizo/);
  assert.match(contact, /type="email"/);
  assert.match(contact, /Solicitar atendimento/);
  assert.match(contact, /name="consentimento"/);
  assert.doesNotMatch(contact, /href="https:\/\/wa\.me/);
});


test("old project URLs redirect permanently to services", async () => {
  for (const route of ["/projetos", "/projetos/bookreadnet"]) {
    const response = await render(route);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "/servicos");
    assert.doesNotMatch(await response.text(), /BookReadNet|GitHub|JoaoGVP001/i);
  }
});

test("sitemap excludes discontinued project pages", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.match(xml, /\/servicos/);
  assert.doesNotMatch(xml, /\/projetos|BookReadNet|GitHub/i);
});
