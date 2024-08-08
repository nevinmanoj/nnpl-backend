import { docSchemaSelector } from "../../utils/docSchemaSelector.js";
import { isAdmin } from "../../utils/isAdmin.js";

export const deleteDoc = async (req, res) => {
  const { id, item } = req.params;
  try {
    //   const userID=req.decoded.userID;
    if (!isAdmin("")) {
      return res.status(404).json({ message: item + " delete failed" });
    }
    //check for admin access

    var docFromDb = null;
    const schema = docSchemaSelector(item);
    if (schema == null) {
      return res.status(404).json({ message: "invalid path", error });
    }
    docFromDb = await schema.findById(id);
    await docFromDb.deleteOne({ _id: id });
    return res.status(200).json({ message: item + " delete success" });
  } catch (error) {
    return res.status(404).json({ message: item + " delete failed" });
  }
};
