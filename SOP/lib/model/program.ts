const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Missing name field"],
    },
    description: { type: String, required: [true, "Missing Description"] },
    infectiousDisease: { type: String, required: [true, "Missing Disease"] },
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Partner",
    // },
  },
  { timestamps: true }
);

export const Program = mongoose.model("Program", programSchema);
