// import { jwksVerified } from '@kinde-oss/kinde-node-sdk'; // Or your framework's Kinde SDK
// import app from 'next/app';

// app.post('/api/webhook', async (req, res) => {
//     try {
//         // 1. Get the raw string token from the body
//         const token = req.body; 

//         // 2. Verify the signature against your Kinde keys
//         const payload = await jwksVerified(token, {
//             audience: "https://<your_kinde_subdomain>.kinde.com"
//         });

//         // 3. Extract the event data safely
//         console.log("Received event type:", payload.event_type);
//         console.log("Event data:", payload.data);

//         res.status(200).send("Webhook received");
//     } catch (err) {
//         console.error("Webhook verification failed:", err.message);
//         res.status(401).send("Invalid signature");
//     }
// });
