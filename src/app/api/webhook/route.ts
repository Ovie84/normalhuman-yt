// // app/api/hello/route.ts
// import { NextResponse } from 'next/server';

// export async function GET() {
//   return NextResponse.json({ message: 'Hello from the API' });
// }

// // /**
// //  * @param {{ json: () => any; }} request
// //  */
// // Alternatively I can delete the above n below comment 
// // n go with the original return statement
// /**
//  * @param {Request} request 
//  */
// export async function POST(request) {
//   const data = await request.json(); // Read request body
//   // return NextResponse.json({ received: data });
//   return NextResponse.json({ message: "Webhook received", received: data });
// }






// Kinde Web Hook (Rename file to route.ts extension for next/kinde)

import { NextResponse } from "next/server";
import { decodeWebhook } from "@kinde/webhooks";

export async function POST(req: Request) {
  try {
    // 1. Extract the raw string token from the request body
    const token = await req.text();

    // 2. Decode and verify the webhook payload using your Kinde Domain
    const decodedToken = await decodeWebhook(token, "https://your_kinde_subdomain.kinde.com");

    // 3. Fallback if the token signature validation fails
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 4. Handle specific user lifecycle triggers
    if (decodedToken.type === "user.created") {
      const { id, email, first_name } = decodedToken.data.user;
      console.log(`User created: ${first_name} (${email}) with ID ${id}`);
      
      // Perform database operations here (e.g., Prisma, Supabase)
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
    
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
