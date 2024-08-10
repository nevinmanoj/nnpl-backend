import { PoSchema } from "../modals/docs/po.js";
import { SalesInvoiceSchema } from "../modals/docs/salesInvoice.js";
import { PurchaseInvoiceSchema } from "../modals/docs/purchaseInvoice.js";

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
