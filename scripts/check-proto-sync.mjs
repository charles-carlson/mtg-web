#!/usr/bin/env node
// Verifies src/app/gen/*_pb.ts is in sync with the backend's .proto file, and that
// every RPC on a generated service has a matching wrapper call in src/app/core/*.service.ts.
//
// Usage: PROTO_SRC=/path/to/backend/proto npm run check:proto-sync

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEN_DIR = path.join(ROOT, 'src/app/gen');
const CORE_DIR = path.join(ROOT, 'src/app/core');

const PROTO_SRC = process.env.PROTO_SRC ?? path.resolve(ROOT, '../mtg-grpc/proto');
const BUF_BIN = existsSync(path.join(ROOT, 'node_modules/.bin/buf'))
  ? path.join(ROOT, 'node_modules/.bin/buf')
  : 'buf';

let failed = false;
const fail = (msg) => {
  console.error(`\x1b[31m✗\x1b[0m ${msg}`);
  failed = true;
};
const ok = (msg) => console.log(`\x1b[32m✓\x1b[0m ${msg}`);

if (!existsSync(PROTO_SRC)) {
  console.error(
    `PROTO_SRC not found: ${PROTO_SRC}\n` +
      `Set it to your backend's proto directory, e.g.\n` +
      `  PROTO_SRC=/path/to/mtg-grpc/proto npm run check:proto-sync`,
  );
  process.exit(1);
}

// 1. Regenerate into a scratch dir and diff byte-for-byte against what's committed.
const scratch = mkdtempSync(path.join(tmpdir(), 'mtg-web-proto-'));
try {
  const template = {
    version: 'v2',
    plugins: [{ local: 'protoc-gen-es', out: scratch, opt: ['target=ts', 'import_extension=js'] }],
  };
  const templatePath = path.join(scratch, 'buf.gen.yaml');
  writeFileSync(templatePath, JSON.stringify(template));

  try {
    execFileSync(BUF_BIN, ['generate', PROTO_SRC, '--template', templatePath], { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to run buf against ${PROTO_SRC}: ${err.message}`);
    process.exit(1);
  }

  const generated = readdirSync(scratch).filter((f) => f.endsWith('.ts'));
  const committed = existsSync(GEN_DIR) ? readdirSync(GEN_DIR).filter((f) => f.endsWith('.ts')) : [];

  for (const f of committed) {
    if (!generated.includes(f)) {
      fail(`src/app/gen/${f} is committed but no longer produced by ${PROTO_SRC} — remove it`);
    }
  }
  for (const f of generated) {
    if (!committed.includes(f)) {
      fail(`${f} is generated from ${PROTO_SRC} but missing from src/app/gen — run proto:generate`);
    }
  }
  for (const f of generated.filter((f) => committed.includes(f))) {
    const fresh = readFileSync(path.join(scratch, f), 'utf8');
    const stale = readFileSync(path.join(GEN_DIR, f), 'utf8');
    if (fresh !== stale) {
      fail(`src/app/gen/${f} is stale relative to ${PROTO_SRC} — run: PROTO_SRC=${PROTO_SRC} npm run proto:generate`);
    } else {
      ok(`src/app/gen/${f} matches backend proto`);
    }
  }
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

// 2. Cross-check RPC coverage: every RPC on a generated service should have a wrapper
//    call in a core service, and every wrapper call should reference a real RPC.
if (!failed) {
  for (const genFile of readdirSync(GEN_DIR).filter((f) => f.endsWith('_pb.ts'))) {
    const src = readFileSync(path.join(GEN_DIR, genFile), 'utf8');
    const serviceMatches = [...src.matchAll(/export const (\w+): GenService<\{([\s\S]*?)\}>/g)];

    if (serviceMatches.length === 0) continue;

    const coreFiles = readdirSync(CORE_DIR).filter((f) => f.endsWith('.service.ts'));
    const coreSrc = coreFiles.map((f) => readFileSync(path.join(CORE_DIR, f), 'utf8')).join('\n');
    const calledMethods = [...coreSrc.matchAll(/this\.client\.(\w+)\(/g)].map((m) => m[1]);

    for (const [, serviceName, body] of serviceMatches) {
      const rpcNames = [...body.matchAll(/^\s*(\w+):\s*\{/gm)].map((m) => m[1]);
      for (const rpc of rpcNames) {
        if (!calledMethods.includes(rpc)) {
          fail(`${serviceName}.${rpc} has no wrapper call (this.client.${rpc}(...)) in src/app/core/*.service.ts`);
        } else {
          ok(`${serviceName}.${rpc} is wired in a core service`);
        }
      }
    }

    const allRpcNames = serviceMatches.flatMap(([, , body]) => [...body.matchAll(/^\s*(\w+):\s*\{/gm)].map((m) => m[1]));
    for (const called of new Set(calledMethods)) {
      if (!allRpcNames.includes(called)) {
        fail(`src/app/core/*.service.ts calls this.client.${called}(), but no generated service defines that RPC`);
      }
    }
  }
}

process.exit(failed ? 1 : 0);
