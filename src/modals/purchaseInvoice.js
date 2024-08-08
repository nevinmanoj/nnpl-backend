import mongoose from "mongoose";

import { productschema } from "./product.js";
import { distributorschema } from "./distributor.js";
import { neuralschema } from "./neural.js";
import { LedgerAccountschema } from "./ledgerAccount.js";
import { customerschema } from "./customer.js";

const purchaseInvoiceschema = mongoose.Schema({
  pino: {
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
