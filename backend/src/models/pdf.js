import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const PdfDetailsSchema = new Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);

export default model("PdfDetails", PdfDetailsSchema);
