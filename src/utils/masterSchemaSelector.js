import { customerSchema } from "../modals/customer.js";
import { distributorSchema } from "../modals/distributor.js";
import { neuralSchema } from "../modals/neural.js";
import { productSchema } from "../modals/product.js";
import { LedgerAccountSchema } from "../modals/ledgerAccount.js";

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
    default:
      return null;
  }
};
