import { createDisease, getDiseases } from "@/lib/controllers/disease";
import { createSOP, getSop } from "@/lib/controllers/sop";

import { dbConnect } from "@/utils/dbconnect";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getDiseases(req, res);
      break;
    case "POST":
      createDisease(req, res);
      break;
    default:
      break;
  }
}
