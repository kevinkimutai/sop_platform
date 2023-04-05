// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  deleteSOP,
  getSingleSOP,
  getSop,
  updateSOP,
} from "@/lib/controllers/sop";

import type { NextApiRequest, NextApiResponse } from "next";

interface CustomNextApiRequest extends NextApiRequest {
  params: {
    [param: string]: string | undefined;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sopId } = req.query;
  switch (req.method) {
    case "GET":
      getSingleSOP(req, res, sopId as string);
      break;
    case "PATCH":
      updateSOP(req, res, sopId as string);
      break;
    case "DELETE":
      deleteSOP(req, res, sopId as string);
      break;
    default:
      break;
  }
}
