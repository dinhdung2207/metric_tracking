import mongoose from "mongoose";
import { UnitType } from "../enums";

export type UnitDocument = mongoose.Document & {
  _id: string;
  name: string;
  typeId: string;
};

export const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: UnitType },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
    },
  },
  { timestamps: true }
);

export default mongoose.model<UnitDocument>("Unit", schema);
