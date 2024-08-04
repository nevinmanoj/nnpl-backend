import { PoSchema } from "../../modals/po.js";
import { SalesInvoiceSchema } from "../../modals/salesInvoice.js";

export const addDoc = async (req, res) => {
  const item = req.params.item;
  try {
    const { data } = req.body;
    //need to generate a new nnpl based id for doc
    const pid = "NNPL/SW/gen/new";
    //   const userID=req.decoded.userID;
    var newDoc = null;

    switch (item) {
      case "po":
        newDoc = new PoSchema({ ...data, pno: pid });
        await newDoc.save();
        break;
      case "sales-invoice":
        newDoc = new SalesInvoiceSchema({ ...data, sino: pid });
        await newDoc.save();
        break;
      default:
        return res.status(404).json({ message: "invalid path", error });
    }

    return res
      .status(200)
      .json({ message: item + " add success", data: newDoc });
  } catch (error) {
    return res.status(401).json({ message: item + " add failed", error });
  }
};
