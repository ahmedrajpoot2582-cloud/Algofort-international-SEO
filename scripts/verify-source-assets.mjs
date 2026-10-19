import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const revision = '8f04c25d853cb30c11bd6fb96f4955845d1b0ab3';
const response = await fetch(`https://api.github.com/repos/algofort/algofort/git/trees/${revision}?recursive=1`);
if (!response.ok) throw new Error(`Source manifest request failed: ${response.status}`);
const { tree, truncated } = await response.json();
if (truncated) throw new Error('Source manifest is incomplete');
// public/lp contains generated build products; rebuilding intentionally changes them.
const files = tree.filter((entry) => entry.type === 'blob' && /^(public|Animation)\//.test(entry.path) && !entry.path.startsWith('public/lp/'));
const failures = [];
for (const file of files) {
  try {
    const bytes = await readFile(file.path);
    const hash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    if (hash !== file.sha) failures.push(file.path);
  } catch { failures.push(file.path); }
}
console.log(JSON.stringify({ revision, checked: files.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
