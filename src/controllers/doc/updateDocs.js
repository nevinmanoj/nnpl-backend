import { docSchemaSelector } from "../../utils/docSchemaSelector.js";
import { calcGrandTotal } from "../../utils/grandTotalCalc.js";
import { isAdmin } from "../../utils/isAdmin.js";

export const modifyDoc = async (req, res) => {
  {
    const { item, id } = req.params;
    try {
      var { data } = req.body;

      //   const userID=req.decoded.userID;
      var dataFromDB = null;
      const schema = docSchemaSelector(item);
      if (schema == null) {
        return res.status(404).json({ message: "invalid path", error });
      }
      dataFromDB = await schema.findById(id);
      //if not in draft modify it to provide overide for admin
      if (dataFromDB.status != "draft" && !isAdmin("")) {
        return res
          .status(404)
          .json({ message: item + " is not in draft state", error });
      }
      const grandTotal = calcGrandTotal({
        products: data.products,
        tax: data.ledgerAccount.tax,
      });
      data = { ...data, grandTotal };
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
