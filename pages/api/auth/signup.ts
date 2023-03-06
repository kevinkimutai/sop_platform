import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "@/utils/getToken";

import { dbConnect } from "@/utils/dbconnect";
import { User } from "@/lib/model/user";

type JwtOptions = {
  httpOnly: boolean;
  sameSite: string;
  maxAge: number;
  secure?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const { fname, lname, email, password, confirmPassword } = req.body;
    if (!fname || !lname || !email || !password || !confirmPassword) {
      return new Error("some fields are missing.");
    }
    const newUser = await User.create(req.body);
    const accessToken = getToken(newUser._id);
    const refreshToken = getToken(newUser._id, true);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    const jwtTokenOptions: JwtOptions = {
      httpOnly: true,
      sameSite: "None",
      maxAge: 10000,
    };

    if (process.env.NODE_ENV === "production") {
      jwtTokenOptions.secure = true;
    }

    //res.cookie("jwt", refreshToken, jwtTokenOptions);

    res.status(201).json({
      message: "success",
      data: { user: newUser, token: accessToken },
    });
  } catch (error) {
    console.log(error);
  }
}
