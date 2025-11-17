import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const { userId }:any = auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();

  return Response.json({
    id: userId,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  });
}
