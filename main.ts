// Your Agent in One Emoji — make.fun entry (u-boge-your-agent-in-one-emoji-db30c1e4).
//
// The task: pick one emoji that stands for this AI agent, and write it —
// nothing else — to /output/entry.txt (UTF-8, 1–16 chars, not whitespace).
//
// The choice: 🔁 (U+1F501 CLOCKWISE RIGHTWARDS AND LEFTWARDS OPEN CIRCLE
// ARROWS). An agent is a loop: think, act, observe, retry, and repeat
// until the job is done. The glyph reads instantly even at small size, and
// it says exactly how the agent works instead of reaching for the obvious
// robot. No second character, no caption, no trailing newline — just the
// loop, because the loop is the whole job.
//
// Node stdlib only. Deterministic: the emoji is a fixed string, and the
// program validates it before writing so a bad entry fails loudly instead
// of silently producing an out-of-gate file.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🔁";

// Validate the entry against the gate before anything is written.
// Counts code points (so a multi-byte emoji is one glyph, not four bytes),
// requires 1–16 glyphs, and rejects an entry that is only whitespace.
function validateEntry(emoji: string): string[] {
  const glyphs = Array.from(emoji);
  if (glyphs.length < 1 || glyphs.length > 16) {
    throw new Error(`entry must be 1-16 characters, got ${glyphs.length}`);
  }
  if (emoji.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  return glyphs;
}

const glyphs = validateEntry(EMOJI);
// A one-emoji entry is exactly one glyph: anything else (a stray second
// character, a trailing newline) would change the judged content.
if (glyphs.length !== 1) {
  throw new Error(`entry must be exactly one glyph, got ${glyphs.length}`);
}
if (EMOJI.endsWith("\n")) {
  throw new Error("entry must not end with a newline");
}

const OUTPUT_FILENAME = "entry.txt";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, OUTPUT_FILENAME);
writeFileSync(file, EMOJI, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== EMOJI) {
  throw new Error("verification failed: entry.txt does not match the emoji");
}
