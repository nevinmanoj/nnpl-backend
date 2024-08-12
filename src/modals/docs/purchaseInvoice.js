import mongoose from "mongoose";

import { productschema } from "../masters/product.js";
import { distributorschema } from "../masters/distributor.js";
import { neuralschema } from "../masters/neural.js";
import { LedgerAccountschema } from "../masters/ledgerAccount.js";
import { customerschema } from "../masters/customer.js";

const purchaseInvoiceschema = mongoose.Schema({
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
    required: false,
  },
  distributor: {
    type: distributorschema,
    required: true,
  },
});

export const PurchaseInvoiceSchema = mongoose.model(
  "purchaseInvoiceSchema",
  purchaseInvoiceschema
);
