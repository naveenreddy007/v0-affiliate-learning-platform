import { createClient } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  // Simple auth check without complex cookie handling
  const authHeader = request.headers.get("authorization")

  // Allow public routes
  const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/error", "/auth/verify-email"]
  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, redirect to login if no auth
  if (!authHeader) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
