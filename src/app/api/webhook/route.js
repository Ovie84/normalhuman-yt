// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API' });
}

/**
 * @param {{ json: () => any; }} request
 */
export async function POST(request) {
  const data = await request.json(); // Read request body
  return NextResponse.json({ received: data });
}
