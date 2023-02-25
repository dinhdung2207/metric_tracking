import mongoose from "mongoose";

export type MetricDocument = mongoose.Document & {
  _id: string;
  value: string;
  unitId: string;
  typeId: string;
};

export const schema = new mongoose.Schema(
  {
    value: { type: String, required: true},
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
    }
    
  },
  { timestamps: true }
);

export default mongoose.model<MetricDocument>("Metric", schema);
