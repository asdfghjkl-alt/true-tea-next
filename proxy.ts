import { NextRequest } from "next/server";
import { updateSessionMiddleware } from "./lib/session";

export async function proxy(request: NextRequest) {
  // 1. Generate Nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.stripe.com https://checkout.stripe.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://res.cloudinary.com https://true-tea.com.au;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://js.stripe.com https://checkout.stripe.com;
    connect-src 'self' https://api.stripe.com;
    upgrade-insecure-requests;
`;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  // 2. Clone headers and set CSP
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  // 3. Create a new request object with the updated headers
  //    This allows the session middleware to act on the modified headers
  const newRequest = new NextRequest(request, {
    headers: requestHeaders,
  });

  // 4. Run session middleware
  const response = await updateSessionMiddleware(newRequest);

  // 5. Apply headers to the outgoing response back to the client
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
