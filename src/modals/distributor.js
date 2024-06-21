import mongoose from "mongoose";

export const distributorschema = mongoose.Schema({
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

export const distributorSchema = mongoose.model(
  "distributorSchema",
  distributorschema
);
