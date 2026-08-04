// import { clerkMiddleware } from '@clerk/nextjs/server';
// import { on } from 'events';

// const isPublicRoute = createRouteMatcher(['/sign-in(.*', '/sign-up(.*']);

// export default clerkMiddleware(async (auth, request) => {
//     if (isPublicRoute(request)) {
//         const session = await auth();
//         session.protect();
//     }
// })

// export const config = {
//     matcher: [
//         //Ski Next.js internals and all static files
//         //'/((?!_next|[^?]*\\.(?:html|css|js(?'!on)|jpe?g|webh|png|svg|ico|tiff|ttf|woff2?|eot|otf|txt|map)$).*)',
//         //Always run for API routes
//         '/(api|trpc)(.*)',
//     ],
// }