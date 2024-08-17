import mongoose from "mongoose";

export const customerschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  companyName: {
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
  city: {
    type: String,
    required: false,
  },
  pin: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

export const customerSchema = mongoose.model("customerSchema", customerschema);
