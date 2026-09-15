"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client for Client Components.
// Uses the publishable (anon) key. Values come from environment variables,
// never committed to the repository (see AGENTS.md).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}