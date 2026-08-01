import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/");
  }

  const user = await getUser();
  if (!user || !user.id) {
    redirect("/");
  }

  // return (
  //     <div style={{ padding: "2rem" }}>
  //         <h1>Authenticated Dashboard</h1>
  //         <p>Welcome back, {user?.given_name || "User"}!</p>
  //     </div>
  // );

  // Sync of fetch the user from the supabase database using Prisma
  // This looks for a user with the Kinde ID, or create it if it doesn't exist
  let dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // Make sure user model fields in schema.prisma match the properties
    dbUser = await db.user.create({
      data: {
        id: user.id,
        emailAddress: user.email ?? "",
        firstName: `${user.given_name ?? ""} ${user.family_name ?? ""}`.trim(),
        lastName: user.family_name ?? "",
        imageUrl: user.picture ?? "",
      },
    });
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Header bar with Sign Out button */}
      <div
        style={{
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          borderBottom: "1px solid #e4e4e7",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ margin: "5px 0 0 0", color: "#71717a" }}>
            Welcome back, {dbUser.firstName || "User"}!
          </p>
        </div>

        {/* Sign Out Button Wrapper */}
        <LogoutLink
          style={{
            padding: "8px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "500",
            fontSize: "14px",
            display: "inline-block",
          }}
        >
          Sign Out
        </LogoutLink>
      </div>

      {/* Database Context Container */}
      <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#f4f4f5", borderRadius: "8px" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Prisma 7 Live Profile:</h3>
        <p><strong>Database ID:</strong> {dbUser.id}</p>
        <p><strong>Email Address:</strong> {dbUser.emailAddress}</p>
        <p><strong>Account Role:</strong> {dbUser.role}</p>
        {dbUser.imageUrl && (
          <img 
            src={dbUser.imageUrl} 
            alt="Profile Avatar" 
            style={{ width: "60px", height: "60px", borderRadius: "50%", marginTop: "10px", border: "2px solid #e4e4e7" }} 
          />
        )}
      </div>
    </div>
  );

  // return (
  //     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
  //         <h1>Dashboard</h1>
  //         <p>Welcome back, <strong>{dbUser.firstName || "User"}</strong>!</p>
  //         <div style={{ marginTop: "1rem", padding: "1rem", background: "#f4f4f5", borderRadius: "8px" }}>
  //             <h3>Database Status:</h3>
  //             <p>User verified and synced with Supabase!</p>
  //             <p>Email: {dbUser.emailAddress}</p>
  //         </div>
  //     </div>
  // );

  // return (
  //     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
  //         <h1>Dashboard</h1>
  //         <p>Welcome back, <strong>{dbUser.firstName} {dbUser.lastName}</strong>!</p>

  //         <div style={{ marginTop:"1rem", padding: "1rem", background: "#f4f5f5", borderRadius: "8px" }}>
  //             <h3>Prisma 7 Database Verification:</h3>
  //             <p>Status: Successfully synced with your Supabase pooler!</p>
  //             <p>Email Registered: {dbUser.emailAddress}</p>
  //             {dbUser.imageUrl && (
  //                 <img
  //                 src={dbUser.imageUrl}
  //                 alt="Profile Picture"
  //                 style={{ width: "50px", height: "50px", borderRadius: "50%", marginTop: "10px" }}
  //                 />
  //             )}
  //         </div>

  //     </div>
  // );
}
