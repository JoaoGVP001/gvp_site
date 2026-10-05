import { getLeadDatabase } from "../../../db/leads";
import { getContactEmailSettings } from "../../../db/contact-email";
import { createLeadHandler } from "../../../lib/leads";
import { createLeadEmailNotifier } from "../../../lib/lead-email";

export const POST = createLeadHandler(getLeadDatabase, createLeadEmailNotifier(getContactEmailSettings));
