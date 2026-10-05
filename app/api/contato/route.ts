import { getLeadDatabase } from "../../../db/leads";
import { createLeadHandler } from "../../../lib/leads";

export const POST = createLeadHandler(getLeadDatabase);
