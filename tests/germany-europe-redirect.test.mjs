import assert from "node:assert/strict";
import test from "node:test";

import middleware, { redirectTarget } from "../middleware.js";

test("Germany permanently redirects every public path to the German Europe entry", () => {
  const response = middleware(new Request("https://cannaworld-germany.de/any/path?utm_source=test"));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://cannaworld-europe.com/?lang=de");
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
});

test("login and access routes keep their intent", () => {
  assert.equal(
    redirectTarget("/login"),
    "https://cannaworld-europe.com/login?lang=de",
  );
  assert.equal(
    redirectTarget("/register"),
    "https://cannaworld-europe.com/request-access?lang=de",
  );
  assert.equal(
    redirectTarget("/request-access"),
    "https://cannaworld-europe.com/request-access?lang=de",
  );
  assert.equal(
    redirectTarget("/onboarding"),
    "https://cannaworld-europe.com/request-access?lang=de",
  );
});

test("German legal paths resolve to canonical CannaWorld legal documents", () => {
  assert.equal(
    redirectTarget("/impressum"),
    "https://cannaworld-thailand.com/impressum?lang=de",
  );
  assert.equal(
    redirectTarget("/datenschutz"),
    "https://cannaworld-thailand.com/privacy?lang=de",
  );
  assert.equal(
    redirectTarget("/agb"),
    "https://cannaworld-thailand.com/terms?lang=de",
  );
});

test("incoming query parameters, including tokens and language overrides, are discarded", () => {
  const cases = [
    ["/foo?utm_source=test", "https://cannaworld-europe.com/?lang=de"],
    ["/foo?lang=en", "https://cannaworld-europe.com/?lang=de"],
    ["/reset-password?token=sentinel", "https://cannaworld-europe.com/?lang=de"],
    ["/login?next=%2Fdashboard&token=sentinel", "https://cannaworld-europe.com/login?lang=de"],
  ];

  for (const [path, expected] of cases) {
    const response = middleware(new Request(`https://cannaworld-germany.de${path}`));
    assert.equal(response.headers.get("location"), expected);
    assert.equal(response.headers.get("location")?.includes("sentinel"), false);
  }
});
