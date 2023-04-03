import { SOP } from "@/lib/model/sop";

// Define your API route
import { dbConnect } from "@/utils/dbconnect";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchText = req.query.search;

  try {
    await dbConnect();
    // Use Mongoose's "find" method with a regular expression to search the "title" field
    const results = await SOP.find({
      title: { $regex: searchText, $options: "i" },
    });

    if (!results) {
      res.status(404).json({ message: "No Sops found!" });
    }

    res.json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred while searching." });
  }
}
