import { customerSchema } from "../modals/masters/customer.js";
import { distributorSchema } from "../modals/masters/distributor.js";
import { neuralSchema } from "../modals/masters/neural.js";
import { productSchema } from "../modals/masters/product.js";
import { LedgerAccountSchema } from "../modals/masters/ledgerAccount.js";
import { ExecutiveSchema } from "../modals/masters/executive.js";

export const masterSchemaSelector = (item) => {
  switch (item) {
    case "customer":
      return customerSchema;
    case "neural":
      return neuralSchema;
    case "distributor":
      return distributorSchema;
    case "products":
      return productSchema;
    case "ledger":
      return LedgerAccountSchema;
    case "executive":
      return ExecutiveSchema;
    default:
      return null;
  }
};
