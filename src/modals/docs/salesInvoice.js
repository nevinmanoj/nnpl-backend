import mongoose from "mongoose";

import { productschema } from "../masters/product.js";
import { customerschema } from "../masters/customer.js";
import { neuralschema } from "../masters/neural.js";
import { LedgerAccountschema } from "../masters/ledgerAccount.js";
import { Executiveschema } from "../masters/executive.js";

const salesInvoiceschema = mongoose.Schema({
  ref: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ledgerAccount: {
    type: LedgerAccountschema,
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
  executive: {
    type: Executiveschema,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

export const SalesInvoiceSchema = mongoose.model(
  "SalesInvoiceSchema",
  salesInvoiceschema
);
