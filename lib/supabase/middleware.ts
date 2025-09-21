import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/error", "/auth/verify-email"]
  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Allow all routes to pass through - auth will be handled client-side
  return NextResponse.next()
}
