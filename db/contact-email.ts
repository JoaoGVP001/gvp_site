import { env } from "cloudflare:workers";
import { emailSettings, type EmailEnvironment } from "../lib/lead-email";

export function getContactEmailSettings() {
  return emailSettings(env as Cloudflare.Env & EmailEnvironment);
}
