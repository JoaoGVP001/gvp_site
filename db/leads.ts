import { env } from "cloudflare:workers";

export function getLeadDatabase(): D1Database {
  if (!env.DB) throw new Error("Lead database unavailable");
  return env.DB;
}
