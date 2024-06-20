import mongoose from "mongoose";

import { itemschema } from "./item.js";
import { customerschema } from "./customer.js";
import { vendorschema } from "./vendor.js";
import { neuralschema } from "./neural.js";

const poschema = mongoose.Schema({
  pno: {
    type: String,
    required: true,
  },
  poStatus: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  items: {
    type: [itemschema],
    required: true,
  },
  vendor: {
    type: vendorschema,
    required: true,
  },
  billing: {
    type: neuralschema,
    required: true,
  },
  customer: {
    type: customerschema,
    required: true,
  },
  tc: {
    type: Object,
    required: false,
  },
});

export const PoSchema = mongoose.model("PoSchema", poschema);
