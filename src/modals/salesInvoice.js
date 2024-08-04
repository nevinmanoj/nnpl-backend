import mongoose from "mongoose";

import { productschema } from "./product.js";
import { customerschema } from "./customer.js";
import { neuralschema } from "./neural.js";

const salesInvoiceschema = mongoose.Schema({
  no: {
    type: String,
    required: true,
  },
  Status: {
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
  products: {
    type: [productschema],
    required: true,
  },
  billing: {
    type: neuralschema,
    required: true,
  },
  roundOff: {
    type: Number,
    required: true,
  },
  customer: {
    type: customerschema,
    required: true,
  },
});

export const SalesInvoiceSchema = mongoose.model(
  "SalesInvoiceSchema",
  salesInvoiceschema
);
