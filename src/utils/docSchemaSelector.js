import { PoSchema } from "../modals/po.js";
import { SalesInvoiceSchema } from "../modals/salesInvoice.js";
import { PurchaseInvoiceSchema } from "../modals/purchaseInvoice.js";

export const docSchemaSelector = (item) => {
  switch (item) {
    case "po":
      return PoSchema;
    case "sales-invoice":
      return SalesInvoiceSchema;
    case "purchase-invoice":
      return PurchaseInvoiceSchema;
    default:
      return null;
  }
};
