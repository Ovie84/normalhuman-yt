// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API' });
}

// /**
//  * @param {{ json: () => any; }} request
//  */
// Alternatively I can delete the above n below comment 
// n go with the original return statement
/**
 * @param {Request} request 
 */
export async function POST(request) {
  const data = await request.json(); // Read request body
  // return NextResponse.json({ received: data });
  return NextResponse.json({ message: "Webhook received", received: data });
}
