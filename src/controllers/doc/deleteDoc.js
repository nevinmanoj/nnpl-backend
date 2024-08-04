import { PoSchema } from "../../modals/po.js";
import { SalesInvoiceSchema } from "../../modals/salesInvoice.js";

import { isAdmin } from "../../utils/isAdmin.js";

export const deleteDoc = async (req, res) => {
  const { id, item } = req.params;
  try {
    //   const userID=req.decoded.userID;
    if (!isAdmin("")) {
      return res.status(404).json({ message: item + " delete failed" });
    }
    //check for admin access

    var docFromDb = null;
    switch (item) {
      case "po":
        docFromDb = await PoSchema.findById(id);
        break;
      case "sales-invoice":
        docFromDb = await SalesInvoiceSchema.findById(id);
        break;
      default:
        return res.status(404).json({ message: "invalid path", error });
    }
    await docFromDb.deleteOne({ _id: id });
    return res.status(200).json({ message: item + " delete success" });
  } catch (error) {
    return res.status(404).json({ message: item + " delete failed" });
  }
};
