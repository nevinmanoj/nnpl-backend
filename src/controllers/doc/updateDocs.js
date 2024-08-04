import { PoSchema } from "../../modals/po.js";
import { SalesInvoiceSchema } from "../../modals/salesInvoice.js";

import { isAdmin } from "../../utils/isAdmin.js";

export const modifyDoc = async (req, res) => {
  {
    const { item, id } = req.params;
    try {
      const { data } = req.body;

      //   const userID=req.decoded.userID;
      var dataFromDB = null;
      switch (item) {
        case "po":
          dataFromDB = await PoSchema.findById(id);
          break;
        case "sales-invoice":
          dataFromDB = await SalesInvoiceSchema.findById(id);
          break;
        default:
          return res.status(404).json({ message: "invalid path", error });
      }
      //if not in draft modify it to provide overide for admin
      if (dataFromDB.status != "draft" && !isAdmin("")) {
        return res
          .status(404)
          .json({ message: item + " is not in draft state", error });
      }
      Object.assign(dataFromDB, data);
      await dataFromDB.save();
      return res
        .status(200)
        .json({ message: item + " modify success", data: dataFromDB });
    } catch (error) {
      return res.status(404).json({ message: item + " modify failed", error });
    }
  }
};
