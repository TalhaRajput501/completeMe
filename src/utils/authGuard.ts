import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function requireAuth(role: string = 'admin') {
  
  const session = await getServerSession(options)

  if(!session) {
    throw new Error("Unauthorized")
    
  }

  if(role && session.user.role !== role) {
    throw new Error("Unauthorized")
  }
  return { session }
}