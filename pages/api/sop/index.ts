import { createSOP, getSop } from "@/lib/controllers/sop";
import { SOP } from "@/lib/model/sop";
import { dbConnect } from "@/utils/dbconnect";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getSop(req, res);
      break;

    case "POST":
      createSOP(req, res);
      break;

    default:
      break;
  }
}
