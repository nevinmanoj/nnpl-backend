import mongoose from "mongoose";

import { productschema } from "./product.js";
import { customerschema } from "./customer.js";
import { distributorschema } from "./distributor.js";
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
    type: [productschema],
    required: true,
  },
  distributor: {
    type: distributorschema,
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
