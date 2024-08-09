import mongoose from "mongoose";

import { productschema } from "./product.js";
import { customerschema } from "./customer.js";
import { neuralschema } from "./neural.js";
import { LedgerAccountschema } from "./ledgerAccount.js";
import { Executiveschema } from "./executive.js";

const salesInvoiceschema = mongoose.Schema({
  sino: {
    type: String,
    required: true,
  },
  status: {
    type: String,
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
});

export const SalesInvoiceSchema = mongoose.model(
  "SalesInvoiceSchema",
  salesInvoiceschema
);
