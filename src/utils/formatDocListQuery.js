import { getObjddmmyyyy } from "./formatDate.js";
export const formatDocListQuery = (query) => {
  var finalQuery = {};
  if (query.customer) {
    finalQuery = { "customer.title": query.customer };
  }
  if (query.distributor) {
    finalQuery = { ...finalQuery, "distributor.title": query.distributor };
  }

  if (query.startDate) {
    finalQuery.date = {
      ...finalQuery.date,
      $gte: getObjddmmyyyy(query.startDate),
    };
  }
  if (query.endDate) {
    finalQuery.date = {
      ...finalQuery.date,
      $lte: getObjddmmyyyy(query.endDate),
    };
  }
  if (query.ref) {
    const regex = new RegExp(query.ref, "i");
    finalQuery = { ...finalQuery, ref: { $regex: regex } };
  }

  return finalQuery;
};
