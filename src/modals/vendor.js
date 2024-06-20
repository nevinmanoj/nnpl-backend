import mongoose from "mongoose";

export const vendorschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  address3: {
    type: String,
    required: false,
  },
});

export const vendorSchema = mongoose.model("vendorSchema", vendorschema);
