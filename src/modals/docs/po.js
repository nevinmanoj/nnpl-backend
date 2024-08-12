import mongoose from "mongoose";

import { productschema } from "../masters/product.js";
import { customerschema } from "../masters/customer.js";
import { distributorschema } from "../masters/distributor.js";
import { neuralschema } from "../masters/neural.js";
import { LedgerAccountschema } from "../masters/ledgerAccount.js";

const poschema = mongoose.Schema({
  ref: {
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
  grandTotal: {
    type: Number,
    required: true,
  },
  products: {
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
