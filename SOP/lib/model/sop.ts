const mongoose = require("mongoose");

const sopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    disease: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Program", // the reference to the Program model
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SOP = mongoose.models.SOP || mongoose.model("SOP", sopSchema);
