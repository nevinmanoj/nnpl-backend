import { customerSchema } from "../modals/customer.js";
import { distributorSchema } from "../modals/distributor.js";
import { neuralSchema } from "../modals/neural.js";
import { productSchema } from "../modals/product.js";
import { LedgerAccountSchema } from "../modals/ledgerAccount.js";

import { masterOptions } from "../utils/masterOptions.js";

export const getItemOptions = async (req, res) => {
  const item = req.params.item;
  try {
    var data = null;
    var label = "title";
    switch (item) {
      case "customer":
        data = await customerSchema.where().lean().exec();
        break;
      case "neural":
        data = await neuralSchema.where().lean().exec();
        break;
      case "distributor":
        data = await distributorSchema.where().lean().exec();
        break;
      case "products":
        data = await productSchema.where().lean().exec();
        label = "product";
        break;
      case "ledger":
        data = await LedgerAccountSchema.where().lean().exec();
        break;
      default:
        return res.status(401).json({ message: "invalid value for item" });
    }

    data = masterOptions(data, label);

    return res.status(200).json({
      message: "GET all " + item + "s success",
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(401).json({ message: "GET all " + item + "s failed" });
  }
};

export const getItem = async (req, res) => {
  const item = req.params.item;
  const id = req.params.id;
  var data = null;
  switch (item) {
    case "customer":
      data = await customerSchema.where("_id", id).lean().exec();
      break;
    case "neural":
      data = await neuralSchema.where("_id", id).lean().exec();
      break;
    case "distributor":
      data = await distributorSchema.where("_id", id).lean().exec();
      break;
    case "products":
      data = await productSchema.where("_id", id).lean().exec();
      break;
    case "ledger":
      data = await LedgerAccountSchema.where("_id", id).lean().exec();
      break;

    default:
      return res.status(401).json({ message: "invalid value for item" });
  }

  if (data.length == 0) {
    return res.status(401).json({ message: "invalid id for item" });
  }
  return res.status(200).json({
    message: "GET " + item + " for id " + id + " success",
    data: data[0],
  });
};

export const addItem = async (req, res) => {
  const item = req.params.item;
  const { data } = req.body;
  try {
    var newdata = null;
    switch (item) {
      case "customer":
        newdata = new customerSchema(data);
        break;
      case "neural":
        newdata = new neuralSchema(data);
        break;
      case "distributor":
        newdata = new distributorSchema(data);
        break;
      case "products":
        newdata = new productSchema(data);
        break;
      case "ledger":
        newdata = new LedgerAccountSchema(data);
        break;
      default:
        return res.status(401).json({ message: "invalid value for item" });
    }

    await newdata.save();
    return res
      .status(200)
      .json({ message: item + " add success", data: newdata });
  } catch (error) {
    return res.status(401).json({ message: item + " add failed", error });
  }
};

export const updateItem = async (req, res) => {
  const item = req.params.item;
  const { data } = req.body;
  console.log(data);
  try {
    var dataFromDb = null;
    switch (item) {
      case "customer":
        dataFromDb = await customerSchema.findById(data._id);
        break;
      case "neural":
        dataFromDb = await neuralSchema.findById(data._id);
        break;
      case "distributor":
        dataFromDb = await distributorSchema.findById(data._id);
        break;
      case "products":
        dataFromDb = await productSchema.findById(data._id);
        break;
      case "ledger":
        dataFromDb = await LedgerAccountSchema.findById(data._id);
        break;
      default:
        return res.status(401).json({ message: "invalid value for item" });
    }
    Object.assign(dataFromDb, data);
    await dataFromDb.save();
    return res
      .status(200)
      .json({ message: item + " update success", data: dataFromDb });
  } catch (error) {
    return res.status(401).json({ message: item + " update failed", error });
  }
};
