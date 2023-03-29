//@ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "@/utils/dbconnect";

import Disease from "../model/disease";

//GET ALL Disease
export const getDiseases = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await dbConnect();

    //1. Filtering
    const queryObj = { ...req.query };
    const queryParams = ["sort", "limit", "page", "fields"];
    queryParams.forEach((element) => delete queryObj[element]);

    //2. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Disease.find(JSON.parse(queryStr));

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
    console.error(error);
  }
};

//GET ONEDisease

interface CustomNextApiRequest extends NextApiRequest {
  params: {
    [param: string]: string | undefined;
  };
}

export const getOneDisease = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  try {
    await dbConnect();
    // Insert document
    const data = await Disease.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "failed to findDisease with that id",
      });
    }
    // Send response
    res.status(200).json({ message: "success", data });
  } catch (error) {
    console.error(error);
  }
};

//DELETEDisease
export const deleteDisease = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  try {
    await dbConnect();
    const data = await Disease.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "failed to findDisease with that id",
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

//EDITDisease
export const updateDisease = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  try {
    await dbConnect();
    const data = await Disease.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ message: "No program found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};

//CREATE PROGRAM
export const createDisease = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await dbConnect();

    const { name, description } = req.body;

    if (!description || !name) {
      res.status(404).json({ message: "Missing Fields" });
    }
    const data = await Disease.create(req.body);

    res.status(201).json({ message: "successfuly created newDisease", data });
  } catch (error) {
    console.error(error);
  }
};
