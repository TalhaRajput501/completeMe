import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function requireAuth(role?: string) {
  
  const session = await getServerSession(options)


  return { session }
}