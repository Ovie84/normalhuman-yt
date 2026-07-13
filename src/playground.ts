import { db  } from "./server/db";

await db.user.create({
    data: {
        emailAddress : "testgmail.com",
        firstName: "Ovie",
        lastName: "Igherebuo",
        imageUrl: "https://avatars.githubusercontent.com/u/109237792?v=4",
        id: "123456789"
    }
});
console.log("done")