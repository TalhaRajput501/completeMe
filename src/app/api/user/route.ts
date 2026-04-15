import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { ApiResponse } from "../../../../types/ApiResponse";

export type postDto = {
  name?: string;
  password?: string;
  email?: string;
};

export async function GET({ req, data }: { req: Request; data: postDto }) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return;
    }
    const user = session.user;
    

    return NextResponse.json(session?.user);
  } catch (error) {

    return NextResponse.json<ApiResponse>({
      statusCode: 500,
      success: false,
      error:  error instanceof Error ? `Error Updating user: ${error.message}` : "An unknown error occurred"
    })

  }
}
