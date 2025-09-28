// This API route is deprecated - using FastAPI backend instead
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ 
    message: "API moved to FastAPI backend", 
    redirect: "http://localhost:8000/api/v1/auth" 
  })
}