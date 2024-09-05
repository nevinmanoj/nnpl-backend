import { DocListOptions } from "../../utils/docListOptions.js";
import { docSchemaSelector } from "../../utils/docSchemaSelector.js";
import { formatDocListQuery } from "../../utils/formatDocListQuery.js";
import { POExcel } from "./POExcel.js";

export const getAllDocs = async (req, res) => {
  const item = req.params.item;
  const query = req.query;
  try {
    var data = null;
    const schema = docSchemaSelector(item);
    if (schema == null) {
      return res.status(404).json({ message: "invalid path", error });
    }
    const formattedQuery = formatDocListQuery(query);

    //pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;
    const totalDocs = await schema.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    data = await schema
      .find(formattedQuery)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (data == null) {
      return res
        .status(401)
        .json({ message: `GET All ${item}(s) for user failed`, query });
    }
    const minData = DocListOptions(data);
    return res.status(200).json({
      message: `GET All ${item}(s) for user success`,
      data: minData,
      query,
      page,
      totalPages,
      totalDocs,
    });
  } catch (error) {
    return res.status(401).json({
      message: `GET All ${item}(s) for user failed`,
      error,
      query,
    });
  }
};

export const getDoc = async (req, res) => {
  const { item, id } = req.params;
  try {
    var data = null;
    const schema = docSchemaSelector(item);
    if (schema == null) {
      return res.status(404).json({ message: "invalid path", error });
    }
    data = await schema.where("_id", id).lean().exec();
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
export const getExcel = async (req, res) => {
  const { item, id } = req.params;
  try {
    var data = null;
    if (item != "po") {
      return res
        .status(404)
        .json({ message: "Excel generation not supported", error });
    }
    const schema = docSchemaSelector(item);
    if (schema == null) {
      return res.status(404).json({ message: "invalid path", error });
    }
    data = await schema.where("_id", id).lean().exec();
    if (data.length == 0) {
      return res.status(401).json({ message: "invalid id for doc" });
    }
    const file = POExcel(data[0]);
    const fileName =
      data[0].distributor.title.split(" ")[0] +
      "_" +
      data[0].ref.replace(/\//g, "_");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + fileName + ".xlsx"
    );
    await file.xlsx.write(res);
    res.end();
  } catch (error) {
    return res.status(401).json({ message: "invalid id for doc" });
  }
};
