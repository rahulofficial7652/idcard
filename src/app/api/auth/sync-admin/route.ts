import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import { connect } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";


export async function POST(req: Request) {

    try {
        await connect();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const clerkId = user?.id;
        const name = user.firstName || "unknown";
        const email = user.emailAddresses[0].emailAddress;
        let admin = await Admin.findOne({ clerkId });

        if (!admin) {
            admin = await Admin.create({
                clerkId,
                name,
                email,
                role: "admin",
                invitedBy: "superadmin",
            })

            return NextResponse.json({ created: true, admin });
        }
        return NextResponse.json({ exists: true, admin });


    } catch (error) {
        console.log("Sync error", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}