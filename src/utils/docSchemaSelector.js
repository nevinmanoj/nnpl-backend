import { PoSchema } from "../modals/po.js";
import { SalesInvoiceSchema } from "../modals/salesInvoice.js";

export const docSchemaSelector = (item) => {
  switch (item) {
    case "po":
      return PoSchema;
    case "sales-invoice":
      return SalesInvoiceSchema;
    default:
      return null;
  }
};
