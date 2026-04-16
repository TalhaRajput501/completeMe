import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { options } from "../auth/[...nextauth]/options";
import type { ApiResponse } from "../../../../types/ApiResponse";
import type { UserInfoUpdateDto } from "../../../../types/user";

export type postDto = UserInfoUpdateDto;

function jsonResponse<T = unknown>(status: number, payload: ApiResponse<T>) {
  return NextResponse.json(payload, { status });
}

export async function GET() {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.username) {
      return jsonResponse(401, {
        success: false,
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    await dbConnect();

    const user = await User.findOne({ username: session.user.username }).select(
      "username email role"
    );

    if (!user) {
      return jsonResponse(404, {
        success: false,
        statusCode: 404,
        error: "User not found",
      });
    }

    return jsonResponse(200, {
      success: true,
      statusCode: 200,
      data: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    return jsonResponse(500, {
      statusCode: 500,
      success: false,
      error:
        error instanceof Error
          ? `Error fetching user: ${error.message}`
          : "An unknown error occurred",
    });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.username) {
      return jsonResponse(401, {
        success: false,
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const body: postDto = await req.json();
    await dbConnect();

    const user = await User.findOne({ username: session.user.username });

    if (!user) {
      return jsonResponse(404, {
        success: false,
        statusCode: 404,
        error: "User not found",
      });
    }

    const wantsPasswordUpdate = Boolean(
      body.currentPassword || body.password || body.confirmPassword
    );
    const wantsUsernameUpdate = Boolean(body.username?.trim());
    const wantsEmailUpdate = Boolean(body.email?.trim());

    if (!wantsPasswordUpdate && !wantsEmailUpdate && !wantsUsernameUpdate) {
      return jsonResponse(400, {
        success: false,
        statusCode: 400,
        error: "No valid update payload provided",
      });
    }

    if (wantsUsernameUpdate && body.username) {
      const normalizedUsername = body.username.trim().toLowerCase();
      const usernameRegex = /^[a-z0-9._-]{3,30}$/;

      if (!usernameRegex.test(normalizedUsername)) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error:
            "Username must be 3-30 characters and can only contain lowercase letters, numbers, dot, underscore, and hyphen",
        });
      }

      if (normalizedUsername === user.username.toLowerCase()) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "New username must be different from current username",
        });
      }

      const usernameTaken = await User.findOne({
        username: normalizedUsername,
        _id: { $ne: user._id },
      });

      if (usernameTaken) {
        return jsonResponse(409, {
          success: false,
          statusCode: 409,
          error: "Username is already in use",
        });
      }

      user.username = normalizedUsername;
    }

    if (wantsPasswordUpdate) {
      if (!body.currentPassword || !body.password || !body.confirmPassword) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "Current password, new password, and confirm password are required",
        });
      }

      if (body.password !== body.confirmPassword) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "New password and confirm password do not match",
        });
      }

      if (body.password.length < 8) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "New password must be at least 8 characters",
        });
      }

      const isMatched = await bcrypt.compare(body.currentPassword, user.password);

      if (!isMatched) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "Current password is incorrect",
        });
      }

      const sameAsOldPassword = await bcrypt.compare(body.password, user.password);
      if (sameAsOldPassword) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "New password must be different from current password",
        });
      }

      user.password = await bcrypt.hash(body.password, 10);
    }

    if (wantsEmailUpdate && body.email) {
      const normalizedEmail = body.email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(normalizedEmail)) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "Please provide a valid email address",
        });
      }

      if (normalizedEmail === user.email.toLowerCase()) {
        return jsonResponse(400, {
          success: false,
          statusCode: 400,
          error: "New email must be different from current email",
        });
      }

      const emailTaken = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: user._id },
      });

      if (emailTaken) {
        return jsonResponse(409, {
          success: false,
          statusCode: 409,
          error: "Email is already in use",
        });
      }

      user.email = normalizedEmail;
    }

    await user.save();

    const updatedFields: string[] = [];
    if (wantsUsernameUpdate) updatedFields.push("Username");
    if (wantsEmailUpdate) updatedFields.push("Email");
    if (wantsPasswordUpdate) updatedFields.push("Password");

    const message =
      updatedFields.length > 1
        ? `${updatedFields.slice(0, -1).join(", ")} and ${
            updatedFields[updatedFields.length - 1]
          } updated successfully${wantsUsernameUpdate ? ". Please sign in again." : ""}`
        : `${updatedFields[0]} updated successfully${
            wantsUsernameUpdate ? ". Please sign in again." : ""
          }`;

    return jsonResponse(200, {
      success: true,
      statusCode: 200,
      message,
      data: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return jsonResponse(500, {
      statusCode: 500,
      success: false,
      error:
        error instanceof Error
          ? `Error updating user: ${error.message}`
          : "An unknown error occurred",
    });
  }
}
