#!/usr/bin/env node
/**
 * Smoke: bundle-load runtime guard.
 *
 * Complement to smoke-bundle-shape.mjs. Where bundle-shape catches
 * KNOWN regression patterns (vendor-helmet split, etc.), bundle-load
 * actually evaluates the entry chunk + every preloaded vendor chunk
 * in a stubbed-DOM node:vm sandbox. Catches generic module-init
 * failures (TDZ, ReferenceError, circular eval, syntax breakage).
 *
 * If a future manualChunks tweak breaks ESM import order in a way the
 * bundle-shape forbidden-list doesn't predict, this guard catches it.
 *
 * Approach
 *  1. Read dist/index.html for the entry script + modulepreload chunks
 *  2. For each chunk, read the file from dist/assets/
 *  3. Compile via vm.SourceTextModule (Node 22 supports ES module records)
 *     Stub globals: document, window, navigator, location, HTMLElement,
 *     fetch, MutationObserver, requestAnimationFrame, etc.
 *  4. Link + evaluate
 *  5. Exit 1 on any throw at module init time
 *
 * Why this catches the PR #96 -> PR #103 -> blank-page bug:
 * The TDZ "Cannot access 'O' before initialization" happens during
 * import() of the entry chunk, before any DOM render. Stubbed globals
 * are sufficient for module-init evaluation (the failing line is a
 * cross-chunk reexport reference, not a DOM call).
 *
 * Limitations
 * - Does NOT verify React actually mounts (would need jsdom or
 *   Playwright). Bundle-shape + this load smoke + smoke-jsonld
 *   together provide layered coverage:
 *     * bundle-shape: known forbidden chunk names (instant)
 *     * bundle-load: ESM import order at module-init time
 *     * smoke-jsonld: post-deploy production HTML JSON-LD parse
 *
 * Usage: node scripts/smoke-bundle-load.mjs
 * Requires Node 22+ with --experimental-vm-modules (added below).
 * Exits 0 on pass, 1 on any module-load throw.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const distDir = "dist";
const assetsDir = join(distDir, "assets");

if (!existsSync(assetsDir)) {
  console.error(`${red}${bold}FAIL${reset} dist/assets not found. Run \`npx vite build\` first.`);
  process.exit(1);
}

if (!vm.SourceTextModule) {
  console.error(
    `${red}${bold}FAIL${reset} node:vm SourceTextModule not available. Re-run with \`node --experimental-vm-modules scripts/smoke-bundle-load.mjs\``
  );
  process.exit(1);
}

const indexHtml = readFileSync(join(distDir, "index.html"), "utf8");
const entryMatch = indexHtml.match(/<script type="module"[^>]+src="\/assets\/(index-[^"]+\.js)"/);
if (!entryMatch) {
  console.error(`${red}${bold}FAIL${reset} no entry script tag in dist/index.html`);
  process.exit(1);
}
const entryFile = entryMatch[1];
const preloadedChunks = [...indexHtml.matchAll(/modulepreload[^>]+href="\/assets\/([^"]+\.js)"/g)].map((m) => m[1]);

console.log(`Entry: ${entryFile}`);
console.log(`Preloaded chunks: ${preloadedChunks.length} (${preloadedChunks.join(", ")})`);

// Stubbed browser globals sufficient for SPA module-init evaluation
function makeStubGlobals() {
  const noopFn = () => {};
  const noopObj = new Proxy(
    {},
    {
      get: (t, k) => {
        if (k === Symbol.toPrimitive) return () => "";
        if (k === "then") return undefined;
        if (typeof k === "symbol") return undefined;
        return noopFn;
      },
      set: () => true,
      apply: () => undefined,
    }
  );
  return {
    document: {
      createElement: () => noopObj,
      getElementById: () => noopObj,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: noopFn,
      removeEventListener: noopFn,
      head: noopObj,
      body: noopObj,
      documentElement: noopObj,
      readyState: "complete",
      dispatchEvent: noopFn,
    },
    window: {
      addEventListener: noopFn,
      removeEventListener: noopFn,
      dispatchEvent: noopFn,
      postMessage: noopFn,
      scrollTo: noopFn,
    },
    navigator: { userAgent: "node-vm-smoke", language: "en-CA", languages: ["en-CA"] },
    location: { href: "https://localhost/", pathname: "/", origin: "https://localhost", search: "", hash: "" },
    history: { pushState: noopFn, replaceState: noopFn, back: noopFn, forward: noopFn, go: noopFn },
    localStorage: { getItem: () => null, setItem: noopFn, removeItem: noopFn, clear: noopFn },
    sessionStorage: { getItem: () => null, setItem: noopFn, removeItem: noopFn, clear: noopFn },
    addEventListener: noopFn,
    removeEventListener: noopFn,
    dispatchEvent: noopFn,
    scrollTo: noopFn,
    HTMLElement: function () {},
    Element: function () {},
    Node: function () {},
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    MutationObserver: function () { return { observe: noopFn, disconnect: noopFn }; },
    requestAnimationFrame: (cb) => setTimeout(cb, 0),
    cancelAnimationFrame: noopFn,
    matchMedia: () => ({ matches: false, addEventListener: noopFn, removeEventListener: noopFn }),
    queueMicrotask: globalThis.queueMicrotask,
    setTimeout: globalThis.setTimeout,
    setInterval: globalThis.setInterval,
    clearTimeout: globalThis.clearTimeout,
    clearInterval: globalThis.clearInterval,
    console: globalThis.console,
    URL: globalThis.URL,
    URLSearchParams: globalThis.URLSearchParams,
    Promise: globalThis.Promise,
    process: { env: {} },
  };
}

const stubGlobals = makeStubGlobals();
stubGlobals.window = stubGlobals;
stubGlobals.globalThis = stubGlobals;

const ctx = vm.createContext(stubGlobals);

const moduleCache = new Map();

async function loadChunk(filename) {
  const cached = moduleCache.get(filename);
  if (cached) return cached;
  const path = join(assetsDir, filename);
  if (!existsSync(path)) {
    throw new Error(`Chunk file not found: ${path}`);
  }
  const src = readFileSync(path, "utf8");
  const mod = new vm.SourceTextModule(src, {
    identifier: `file://${path}`,
    context: ctx,
  });
  moduleCache.set(filename, mod);
  return mod;
}

async function linker(specifier, referencingModule) {
  // Specifiers in vite-built bundles are relative ("./vendor-react-*.js") or absolute paths
  let chunkFile = specifier.replace(/^\.\//, "").replace(/^\/assets\//, "");
  if (!chunkFile.endsWith(".js")) chunkFile += ".js";
  return await loadChunk(chunkFile);
}

let pass = 0;
let fail = 0;
function record(name, ok, hint = "") {
  const tag = ok ? `${green}PASS${reset}` : `${red}FAIL${reset}`;
  console.log(`${tag}  ${name}${hint ? `  (${hint})` : ""}`);
  ok ? pass++ : fail++;
}

// We classify errors. The bundle-load smoke catches MODULE-INIT failures
// (TDZ, ReferenceError, SyntaxError, circular import). Render-time
// failures from the stubbed-DOM environment are expected and harmless
// — they prove module evaluation completed and React side-effects ran.
const TDZ_OR_INIT_PATTERNS = [
  /Cannot access ['"]?\w+['"]? before initialization/i,
  /is not defined/i,
  /Unexpected token/i,
  /SyntaxError/i,
  /Cannot find module/i,
];
// Acceptable "post-init" errors: React render-time errors from the stub DOM.
// React error #299: createRoot(...) target is not a DOM element — expected
// because our stub returns a plain object, not a real Element instance.
const ACCEPTABLE_POST_INIT_PATTERNS = [
  /Minified React error #299/i,
  /createRoot.+not a DOM element/i,
  /target container is not a DOM element/i,
];

try {
  const entry = await loadChunk(entryFile);
  await entry.link(linker);
  await entry.evaluate();
  record(`entry chunk ${entryFile} loads + evaluates clean`, true);
} catch (e) {
  const msg = String(e.message || e);
  const isTDZ = TDZ_OR_INIT_PATTERNS.some((re) => re.test(msg));
  const isAcceptable = ACCEPTABLE_POST_INIT_PATTERNS.some((re) => re.test(msg));
  if (isAcceptable && !isTDZ) {
    record(
      `entry chunk ${entryFile} module-init completed (render-time stub error expected)`,
      true,
      msg.slice(0, 80)
    );
  } else {
    record(`entry chunk ${entryFile} loads + evaluates without TDZ`, false, msg.slice(0, 200));
    console.error("Module-init failure stack:\n" + (e.stack || e));
  }
}

console.log(`\n${bold}${pass}/${pass + fail} cases pass${reset}`);
process.exit(fail ? 1 : 0);
