import { db  } from "./server/db";

await db.user.create({
    data: {
        emailAddress : "testgmail.com",
        firstName: "Ovie",
        lastName: "Igherebuo",
    }
});
console.log("done")