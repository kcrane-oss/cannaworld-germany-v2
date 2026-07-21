const EUROPE_ROOT = "https://cannaworld-europe.com/?lang=de";

const EXACT_TARGETS = new Map([
  ["/login", "https://cannaworld-europe.com/login?lang=de"],
  ["/register", "https://cannaworld-europe.com/request-access?lang=de"],
  ["/request-access", "https://cannaworld-europe.com/request-access?lang=de"],
  ["/onboarding", "https://cannaworld-europe.com/request-access?lang=de"],
  ["/impressum", "https://cannaworld-thailand.com/impressum?lang=de"],
  ["/datenschutz", "https://cannaworld-thailand.com/privacy?lang=de"],
  ["/agb", "https://cannaworld-thailand.com/terms?lang=de"],
]);

export function redirectTarget(pathname) {
  const normalized = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  return EXACT_TARGETS.get(normalized) ?? EUROPE_ROOT;
}

export default function middleware(request) {
  const incoming = new URL(request.url);

  return new Response(null, {
    status: 301,
    headers: {
      Location: redirectTarget(incoming.pathname),
      "Cache-Control": "public, max-age=300",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
