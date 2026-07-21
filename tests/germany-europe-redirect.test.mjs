import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

test("Germany permanently redirects every public path to the German Europe entry", () => {
  const redirects = config.redirects ?? [];
  const catchAll = redirects.at(-1);

  assert.deepEqual(catchAll, {
    source: "/:path*",
    destination: "https://cannaworld-europe.com/?lang=de",
    statusCode: 301,
  });

  for (const redirect of redirects) {
    assert.equal(redirect.statusCode, 301);
    assert.match(redirect.destination, /^https:\/\/cannaworld-europe\.com\//);
  }
});

test("login and access routes keep their intent", () => {
  const bySource = new Map(config.redirects.map((redirect) => [redirect.source, redirect]));

  assert.equal(
    bySource.get("/login")?.destination,
    "https://cannaworld-europe.com/login?lang=de",
  );
  assert.equal(
    bySource.get("/request-access")?.destination,
    "https://cannaworld-europe.com/request-access?lang=de",
  );
  assert.equal(
    bySource.get("/onboarding")?.destination,
    "https://cannaworld-europe.com/request-access?lang=de",
  );
});
