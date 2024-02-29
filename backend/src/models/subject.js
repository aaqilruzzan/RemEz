import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: Map,
    of: String,
    required: true,
  },
  systemAnswers: {
    type: [String], // Array of strings
    required: false,
  },
  userAnswers: {
    type: [String], // Array of strings
    required: false,
  },
  similarityScores: {
    type: [Number], // Array of numbers
    required: false,
  },
  times: {
    type: Map,
    of: Number,
    required: true,
  },
});

export default model("subjectDetails", subjectSchema);
