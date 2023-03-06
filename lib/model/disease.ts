import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

let Disease;

try {
  Disease = mongoose.model("Disease");
} catch (error) {
  Disease = mongoose.model("Disease", diseaseSchema);
}

export default Disease;
