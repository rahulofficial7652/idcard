import { NextResponse } from "next/server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";



export async function POST(req : Request) {
    try{
         const user = await currentUser();

    if(!user){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if(user.emailAddresses[0].emailAddress ! == process.env.SUPERADMIN_EMAIL!){
        return NextResponse.json({
             error: "Super Admin can invite only"
            }, { status: 403 });
    }
    const {email} = await req.json();

    if(!email){
        return NextResponse.json({email: "Email is required"}, {status: 400});
    }
   
    const invite = await clerkClient.invitations.createInvitation({
        emailAddress : email,
        publicMetaData : {role: "admin"},
        redirectUrl: `${process.env.NEXT_PUBLIC_URL}/sign-in`

    });
    return NextResponse.json({
        message : "Admin invited successfully";
        invite,
    })
    }
    catch(error){
        return NextResponse.json({error: "Something went wrong, Admin cannot be invited"}, {status: 500});
    }
}