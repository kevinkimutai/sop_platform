import { getSop } from "@/lib/controllers/sop";
import { deleteUser, getUser, updateUser } from "@/lib/controllers/users";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  switch (req.method) {
    case "GET":
      getUser(req, res, userId as string);
      break;
    case "PATCH":
      updateUser(req, res, userId as string);
      break;
    case "DELETE":
      deleteUser(req, res, userId as string);
      break;
    default:
      break;
  }
}
