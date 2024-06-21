import { customerSchema } from "../modals/customer.js";
import { distributorSchema } from "../modals/distributor.js";
import { neuralSchema } from "../modals/neural.js";

export const getItems = async (req, res) => {
  const item = req.params.item;
  try {
    var data = null;
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
      default:
        res.status(401).json({ message: "invalid value for item" });
    }

    res.status(200).json({
      message: "GET all " + item + "s success",
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(401).json({ message: "GET all " + item + "s failed" });
  }
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
      default:
        res.status(401).json({ message: "invalid value for item" });
    }

    await newdata.save();
    res.status(200).json({ message: item + " add success", data: newdata });
  } catch (error) {
    res.status(401).json({ message: item + " add failed", error });
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
      default:
        res.status(401).json({ message: "invalid value for item" });
    }
    Object.assign(dataFromDb, data);
    await dataFromDb.save();
    res
      .status(200)
      .json({ message: item + " update success", data: dataFromDb });
  } catch (error) {
    res.status(401).json({ message: item + " update failed", error });
  }
};
