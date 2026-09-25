
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Runs on every matched request. The @supabase/ssr auth flow stores the
// session in cookies; this middleware reads those cookies, lets Supabase
// refresh the session if the access token has expired, and writes any
// updated cookies back onto the response. Without this, a successful
// sign-in would not persist across requests.
export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write cookies onto both the request (so later reads see them)
          // and a fresh response (so the browser receives them).
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Touching getUser() is what triggers the token refresh. Do not remove.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Run on all routes except static assets and image files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|JPG)$).*)",
  ],
};
