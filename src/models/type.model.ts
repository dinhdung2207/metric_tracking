import mongoose from "mongoose";
import { MetricType } from "../enums";

export type TypeDocument = mongoose.Document & {
  _id: string;
  name: string;
  units: [string];
};

export const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: MetricType },
    units: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<TypeDocument>("Type", schema);
