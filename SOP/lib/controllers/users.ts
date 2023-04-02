import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../model/user";
import { dbConnect } from "@/utils/dbconnect";
import { userAgent } from "next/server";

//GET ALL USERS
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    //1. Filtering
    const queryObj = { ...req.query };
    const queryParams = ["sort", "limit", "page", "fields"];
    queryParams.forEach((element) => delete queryObj[element]);

    //2. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    //3.Sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-created_at");
    }

    //4.Limiting Fields
    if (req.query.fields) {
      const fields = (req.query.fields as string).split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //5.Pagination

    const page = +req.query.page! || 1;
    const limit = +req.query.limit! || 100;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    //////QUERY THE MODEL
    const data = await query;

    res.status(200).json({
      message: "Success",
      items: data.length,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

//GET ONE USERS

interface CustomNextApiRequest extends NextApiRequest {
  params: {
    [param: string]: string | undefined;
  };
}

export const getUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    await dbConnect();
    // Insert document
    const data = await User.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "failed to find any users",
      });
    }
    // Send response
    res.status(200).json({ message: "success", data });
  } catch (error) {
    console.error(error);
  }
};

//DELETE USER
export const deleteUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    await dbConnect();
    const data = await User.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        message: "failed to find any users",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
};

//EDIT USER
export const updateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    await dbConnect();
    const data = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ message: "No User found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};
