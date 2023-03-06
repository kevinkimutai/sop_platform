import multer, { FileFilterCallback } from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

import { Express } from "express";
import { SOP } from "../model/sop";
import { dbConnect } from "@/utils/dbconnect";

//FIND,FILTER,SORT,LIMIT,PAGINATE SOPs
export const getSop = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("ALSO ME ");
  try {
    //1. Filtering
    const queryObj = { ...req.query };
    const queryParams = ["sort", "limit", "page", "fields"];
    queryParams.forEach((element) => delete queryObj[element]);

    //2. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = SOP.find(JSON.parse(queryStr));

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
    const limit = +req.query.limit! || 10;

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
    console.error(error);
  }
  await dbConnect();
};

//CREATE A NEW SOP

export const createSOP = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, program, file } = req.body;
  console.log(req.body);
  try {
    await dbConnect();
    // Insert document
    const data = await SOP.create({
      title,
      description,
      program,
      file,
    });

    // Send response
    res.status(200).json({ message: "Data saved to database!", data });
  } catch (error) {
    console.log(error);
  }
};

interface CustomNextApiRequest extends NextApiRequest {
  params: {
    [param: string]: string | undefined;
  };
}

//GET ONE SOP

export const getSingleSOP = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  console.log("IM THE ONE EXECUTING");
  try {
    await dbConnect();
    // Insert document
    const data = await SOP.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "failed to find any sops",
      });
    }
    // Send response
    res.status(200).json({ message: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//DELETE SOP
export const deleteSOP = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  console.log("I AM ALSO BEING ACCESSED");
  try {
    await dbConnect();
    const data = await SOP.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        message: "failed to find any sops documents",
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

//EDIT SOP
export const updateSOP = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    await dbConnect();
    const data = await SOP.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ message: "No sop found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};
