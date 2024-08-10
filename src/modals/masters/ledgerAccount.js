import mongoose from "mongoose";

export const LedgerAccountschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
});

export const LedgerAccountSchema = mongoose.model(
  "LedgerAccountSchema",
  LedgerAccountschema
);
