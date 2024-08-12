import { Schema, model } from "mongoose";

export const counterSchema = new Schema({
  _id: String,
  seq: Number,
});

export const Counter = model("Counter", counterSchema);
