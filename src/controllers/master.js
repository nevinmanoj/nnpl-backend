import { masterOptions } from "../utils/masterOptions.js";
import { masterSchemaSelector } from "../utils/masterSchemaSelector.js";

export const getItemOptions = async (req, res) => {
  const item = req.params.item;
  try {
    var data = null;
    var label = "title";

    const schema = masterSchemaSelector(item);
    if (schema == null) {
      return res.status(401).json({ message: "invalid value for item" });
    }
    if (item == "products") {
      label = "product";
    }
    if (item == "executive") {
      label = "name";
    }
    data = await schema.where().lean().exec();
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
  const schema = masterSchemaSelector(item);
  if (schema == null) {
    return res.status(401).json({ message: "invalid value for item" });
  }
  data = await schema.where("_id", id).lean().exec();

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
    const schema = masterSchemaSelector(item);
    if (schema == null) {
      return res.status(401).json({ message: "invalid value for item" });
    }

    newdata = new schema(data);
    await newdata.save();
    return res
      .status(200)
      .json({ message: item + " add success", data: newdata });
  } catch (error) {
    return res.status(401).json({ message: item + " add failed", error });
  }
};

export const updateItem = async (req, res) => {
  const { id, item } = req.params;
  const { data } = req.body;
  console.log(data);
  try {
    var dataFromDb = null;
    const schema = masterSchemaSelector(item);
    if (schema == null) {
      return res.status(401).json({ message: "invalid value for item" });
    }
    dataFromDb = await schema.findById(id);
    Object.assign(dataFromDb, data);
    await dataFromDb.save();
    return res
      .status(200)
      .json({ message: item + " update success", data: dataFromDb });
  } catch (error) {
    return res.status(401).json({ message: item + " update failed", error });
  }
};
