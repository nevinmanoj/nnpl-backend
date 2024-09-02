import { docSchemaSelector } from "../../utils/docSchemaSelector.js";
import { getPoNo } from "../../utils/getPoNo.js";
import { calcTotal } from "../../utils/calcTotal.js";

export const addDoc = async (req, res) => {
  const item = req.params.item;
  try {
    var { data } = req.body;

    const schema = docSchemaSelector(item);
    if (schema == null) {
      return res.status(404).json({ message: "invalid path", error });
    }

    // const ref = await getPoNo(data["date"]);
    //   const userID=req.decoded.userID;
    if (item == "po") {
      data = { ...data, ref: "temp" };
    }

    var grandTotal = calcTotal(data.products);
    const convtax = parseFloat(data.ledgerAccount.tax);
    const convdiscount = parseFloat(data.discount);
    const convRoundOff = parseFloat(data.roundOff);
    grandTotal =
      grandTotal + convRoundOff - convdiscount + (grandTotal * convtax) / 100;
    data = { ...data, grandTotal, status: "draft" };

    var newDoc = new schema(data);
    const error = newDoc.validateSync();
    if (error) {
      return res.status(401).json({ message: item + " add failed", error });
    }
    if (item == "po") {
      const ref = await getPoNo(data["date"]);
      data = { ...data, ref };
      newDoc = new schema(data);
    }
    await newDoc.save();
    return res
      .status(200)
      .json({ message: item + " add success", data: newDoc });
  } catch (error) {
    return res.status(401).json({ message: item + " add failed", error });
  }
};
