// //api/kinde/webhook/route.ts

// // just added this for trial
// export const runtime = "nodejs"

// import { db } from "@/server/db";

// export const POST = async (request: Request) => {
//     const { data } = await request.json();
//     console.log("Kinde Webhook received: ", data);
//     const emailAddress = data.email_address[0].email_address;
//     const firstName = data.first_name
//     const lastName = data.last_name;
//     const imageUrl = data.image_url;
//     const id = data.id;

//     await db.user.create({
//         data: {
//             emailAddress: emailAddress,
//             firstName: firstName,
//             lastName: lastName,
//             imageUrl: imageUrl,
//             id: id
//         }
//     });

//     console.log('user created succesfully');
//     return new Response("Webhook received", {status: 200} )
// }



// Extracting payload using kinde's official @kinde/webhooks package
//  to decode JWT string safely

import { db } from '@/server/db';
import { decodeWebhook } from '@kinde/webhooks';
import { use } from 'react';

export const POST = async (request: Request) => {
    try{
        //1. Read the raw encrypted JWT token text stream instead of json()
        const token = await request.text();

        //2. Decode and verify the signature using your kinde enterprise dashboard domain 
        // Replace with your actual kinde domain URL string
        const decodedEvent = await decodeWebhook(token, process.env.KINDE_ISSUER_URL!);

        if(!decodedEvent) {
            console.error("Invalid kinde webhook token signature recieved.");
            return new Response("Unauthorized Signature", { status: 401 });
        }

        console.log("Kinde Webhook authenticated successfully. Type:", decodedEvent.type);

        //3. Target the user registration life-cycle event specifically
        if (decodedEvent.type === "user.created"){
            const userData = decodedEvent.data.user;

            // Extract values according to kinde's verified event payload properties
            const id = userData.id;
            const emailAddress = userData.email;
            const firstName = userData.first_name ?? "";
            const lastName = userData.last_name ?? "";
            // const imageUrl = userData.picture ?? "";

            //4. Upsert or Create user records safely inside your Supabase cluster database
            await db.user.create({
                data: {
                    id, 
                    emailAddress,
                    firstName,
                    lastName,
                    // imageUrl,
                }
            });

            console.log('User created successfully in database!');
        }

        return new Response("Webhook received", { status:200 });
    } catch (error) {
        const err = error as Error;
        console.error("Webhook route error execution details:", err.message);
        return new Response("Internal Server Error", {status: 500});
    }
}