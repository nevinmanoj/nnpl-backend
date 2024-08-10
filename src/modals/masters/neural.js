import mongoose from "mongoose";

export const neuralschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  faxno: {
    type: String,
    required: false,
  },
  gst: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  email: {
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

export const neuralSchema = mongoose.model("neuralSchema", neuralschema);
