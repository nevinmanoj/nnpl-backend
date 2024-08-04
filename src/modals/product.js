import mongoose from "mongoose";

export const productschema = mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  productDesc: {
    type: String,
    required: false,
  },
  partCode: {
    type: String,
    required: false,
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
