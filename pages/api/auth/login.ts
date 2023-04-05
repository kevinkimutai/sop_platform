// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { setCookie } from "nookies";

import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "@/utils/getToken";

import { User } from "@/lib/model/user";
import { dbConnect } from "@/utils/dbconnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const { email, password } = req.body;

    //1.check if user exists
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Enter Email and Password to log in" });

    //2.check if email exists
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePasswords(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Wrong email or password, Try again!" });
    } else {
      //3. success,return auth
      const token = getToken(user._id);

      // setCookie(null, "session", token, {
      //   maxAge: 60 * 60 * 24, // cookie will expire in 1 day
      //   path: "/", // cookie is available on all pages
      //   httpOnly: true, // cookie cannot be accessed by client-side JavaScript
      // });

      res.status(200).json({
        status: "success",
        data: {
          user,
          token,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}
