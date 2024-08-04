import { PoSchema } from "../../modals/po.js";
import { SalesInvoiceSchema } from "../../modals/salesInvoice.js";

export const getAllDocs = async (req, res) => {
  const item = req.params.item;
  try {
    var data = null;
    switch (item) {
      case "po":
        data = await PoSchema.where().lean().exec();
        break;
      case "sales-invoice":
        data = await SalesInvoiceSchema.where().lean().exec();
        break;
      default:
        return res.status(404).json({ message: "invalid path", error });
    }
    if (data == null) {
      return res
        .status(401)
        .json({ message: `GET All ${item}(s) for user failed` });
    }
    return res.status(200).json({
      message: `GET All ${item}(s) for user success`,
      count: data.length,
      data,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: `GET All ${item}(s) for user failed` });
  }
};

export const getDoc = async (req, res) => {
  const { item, id } = req.params;
  try {
    var data = null;
    switch (item) {
      case "po":
        data = await PoSchema.where("_id", id).lean().exec();
        break;
      case "sales-invoice":
        data = await SalesInvoiceSchema.where("_id", id).lean().exec();
        break;
      default:
        return res.status(404).json({ message: "invalid path", error });
    }
    if (data.length == 0) {
      return res.status(401).json({ message: "invalid id for doc" });
    }
    return res.status(200).json({
      message: "GET " + item + " for id " + id + " success",
      data: data[0],
    });
  } catch (error) {
    return res.status(401).json({ message: "invalid id for doc" });
  }
};
