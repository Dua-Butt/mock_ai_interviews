// utils/supabase/server.ts
import { createServerClient, SupabaseClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies() // ✅ Async in Next.js 15

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // make sure this exists in .env.local
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // ignore errors
          }
        }
      }
    }
  )
}
