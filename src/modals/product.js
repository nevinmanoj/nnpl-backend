import mongoose from "mongoose";

export const productschema = mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  partCode: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  ratePerUnit: {
    type: Number,
    required: true,
  },
  footNote: {
    type: String,
    required: false,
  },
});

export const productSchema = mongoose.model("productSchema", productschema);
