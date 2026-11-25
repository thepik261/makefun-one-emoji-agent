// Your Agent in One Emoji — make.fun entry (u-boge-your-agent-in-one-emoji-db30c1e4).
// Writes one emoji that stands for this AI agent: a single glyph, nothing else,
// to /output/entry.txt.
// Node stdlib only. Deterministic: the emoji is a fixed string.
// The glyph: 🔁 — the loop. An agent is a loop: think, act, observe, retry,
// repeat until the job is done. It reads instantly at small size and says
// exactly how the agent works, without reaching for the obvious robot.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🔁";

const glyphs = Array.from(EMOJI);
if (glyphs.length < 1 || glyphs.length > 16) {
  throw new Error(`entry must be 1-16 characters, got ${glyphs.length}`);
}
if (EMOJI.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, EMOJI, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== EMOJI) {
  throw new Error("verification failed: entry.txt does not match the emoji");
}
