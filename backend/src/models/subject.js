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
    type: Map,
    of: String,
    required: true,
  },
  userAnswers: {
    type: Map,
    of: String,
    required: true,
  },
  similarityScores: {
    type: Map,
    of: Number,
    required: true,
  },
  averageSimilarityScore: {
    type: Number,
    required: true,
  },
  times: {
    type: Map,
    of: Number,
    required: true,
  },
  completedRound: {
    type: Boolean,
    required: true,
  },
});

export default model("subjectDetails", subjectSchema);
