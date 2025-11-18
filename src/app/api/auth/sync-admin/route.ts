import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connect } from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await connect();

    // 1️Clerk current user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const clerkId = user.id;
    const name = user.firstName || "Unknown";
    const email = user.emailAddresses[0].emailAddress;

    // SuperAdmin detection (via env)
    const isSuperAdmin =
      email === process.env.SUPERADMIN_EMAILS;

    // 3️ Find admin in DB
    let admin = await Admin.findOne({ clerkId });

    // 4️ If admin DOES NOT exist → create new one
    if (!admin) {
      admin = await Admin.create({
        clerkId,
        name,
        email,
        role: isSuperAdmin ? "superadmin" : "admin",
        invitedBy: isSuperAdmin ? "system" : "superadmin",
      });

      return NextResponse.json({
        created: true,
        admin,
      });
    }

    // 5️⃣ If admin already exists → update lastLogin
    admin.lastLogin = new Date();
    await admin.save();

    return NextResponse.json({
      exists: true,
      admin,
    });
  } catch (error: any) {
    console.error("SYNC ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
