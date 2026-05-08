//api/kinde/webhook/route.ts

import { db } from "@/server/db";

export const POST = async (request: Request) => {
    const { data } = await request.json();
    console.log("Kinde Webhook received: ", data);
    const emailAddress = data.email_address[0].email_address;
    const firstName = data.first_name
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id;

    await db.user.create({
        data: {
            emailAddress: emailAddress,
            firstName: firstName,
            lastName: lastName,
            imageUrl: imageUrl,
            id: id
        }
    });

    return new Response("Webhook received", {status: 200} )
}