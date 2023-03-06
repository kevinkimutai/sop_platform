// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getUsers } from "@/lib/controllers/users";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getUsers(req, res);
      break;

    default:
      break;
  }
}
