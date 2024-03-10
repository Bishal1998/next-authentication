import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/config/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

const POST = async (req: Request, res: Response) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { firstName, lastName, email, phoneNumber, password } = data;

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "All Fields are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await user.save();

    const { password: pass, ...item } = user._doc;

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        item,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Couldn't create user",
        error,
      },
      { status: 500 }
    );
  }
};

export { POST };
