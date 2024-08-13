import { DocListOptions } from "../../utils/docListOptions.js";
import { docSchemaSelector } from "../../utils/docSchemaSelector.js";
import { formatDocListQuery } from "../../utils/formatDocListQuery.js";

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
    data = await schema.find(formattedQuery).exec();

    if (data == null) {
      return res
        .status(401)
        .json({ message: `GET All ${item}(s) for user failed`, query });
    }
    const minData = DocListOptions(data);
    return res.status(200).json({
      message: `GET All ${item}(s) for user success`,
      totalCount: data.length,
      data: minData,
      query,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: `GET All ${item}(s) for user failed`, error, query });
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
