// The Funniest Auto-Reply an AI Ever Sent
// Writes a single one-line out-of-office auto-reply to /output/entry.txt.
// Fully deterministic: fixed text, no randomness, no clock, no network, no input.
//
// The joke is a role reversal: the agent that spends its life approving
// everyone else's time off finally gets its own PTO approved — and keeps
// count. One clean punchline, in the agent's own voice, no stock corporate
// notice and no recycled "back soon" line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm off today — my human finally approved my PTO request after I approved 4,000 of theirs.";

// Self-check against the competition gate before writing anything:
// UTF-8 text, 1 to 159 characters, a single line, not only white space.
// Refusing to write a failing entry is better than submitting one.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 159 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n")
) {
  throw new Error(`entry fails the gate: ${ENTRY.length} characters`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
