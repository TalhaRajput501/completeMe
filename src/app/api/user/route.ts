import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { ApiResponse } from "../../../../types/ApiResponse";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";

export type postDto = { 
  password?: {
    current: string;
    new: string;
    confirm: string;
  };
  email?: string; 
};

export async function POST({ data }: { data: postDto }) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      throw new Error("Unauthorized"); 
    }

    const user = session.user;
    let updatedUser;

    const password = data.password
  
    if(password){

      const matchPassword = password.current === password.new || password.current === password.confirm;
      const differPassword = password.new !== password.confirm;

      if (matchPassword) {
        return NextResponse.json<ApiResponse>({
          statusCode: 400,
          success: false,
          error: "New password cannot be the same as the old password"
        });
      }

      if (differPassword) {
        return NextResponse.json<ApiResponse>({
          statusCode: 400,
          success: false,
          error: "New password and confirm password do not match"
        });
      }


      const hashedPassword = await bcrypt.hash(password.confirm, 10);

      updatedUser = await User.findOneAndUpdate(
        { username: user.name },
        { password: hashedPassword },
        { new: true }
      )
    }

    if(data.email){
      updatedUser = await User.findOneAndUpdate(
        { username: user.name },
        { email: data.email },
        { new: true }
      )
    }
    

    return NextResponse.json(<ApiResponse>({
      statusCode: 200,
      success: true,
      message: "User information updated successfully",
      data: { user: updatedUser }
    }));
  } catch (error) {

    return NextResponse.json<ApiResponse>({
      statusCode: 500,
      success: false,
      error:  error instanceof Error ? `Error Updating user: ${error.message}` : "An unknown error occurred"
    })

  }
}
