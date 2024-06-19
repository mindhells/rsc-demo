import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getFullPath(...path: string[]) {
  return join(__dirname, '../../dist/', ...path);
}

export function readJSONFile(...path: string[]) {
  return JSON.parse(
    readFileSync(join(__dirname, '../../dist/', ...path), 'utf-8'),
  );
}

export function getRelativeSourcePath(fileURL: string, ...path: string[]) {
  return relative(join(__dirname, '..', ...path), new URL(fileURL).pathname);
}
