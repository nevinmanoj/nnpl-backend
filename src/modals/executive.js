import mongoose from "mongoose";

export const Executiveschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const ExecutiveSchema = mongoose.model(
  "ExecutiveSchema",
  Executiveschema
);
