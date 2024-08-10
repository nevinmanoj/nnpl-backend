import { docSchemaSelector } from "../../utils/docSchemaSelector.js";
import { calcGrandTotal } from "../../utils/grandTotalCalc.js";

export const addDoc = async (req, res) => {
  const item = req.params.item;
  try {
    const { data } = req.body;
    //need to generate a new nnpl based id for doc
    const pid = "NNPL/SW/gen/new";
    //   const userID=req.decoded.userID;
    var newDoc = null;
    if (item == "po") {
      data = { ...data, pno: pid };
    }

    const grandTotal = calcGrandTotal({
      products: data.products,
      tax: data.ledgerAccount.tax,
    });
    data = { ...data, grandTotal };

    const schema = docSchemaSelector(item);
    if (schema == null) {
      return res.status(404).json({ message: "invalid path", error });
    }
    newDoc = new schema(data);
    await newDoc.save();
    return res
      .status(200)
      .json({ message: item + " add success", data: newDoc });
  } catch (error) {
    return res.status(401).json({ message: item + " add failed", error });
  }
};
