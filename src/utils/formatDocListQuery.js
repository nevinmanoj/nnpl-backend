export const formatDocListQuery = (query) => {
  var finalQuery = {};
  if (query.customer) {
    finalQuery = { "customer.title": query.customer };
  }
  if (query.distributor) {
    finalQuery = { ...finalQuery, "distributor.title": query.distributor };
  }
  if (query.startDate) {
    finalQuery.date = { ...finalQuery.date, $gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    finalQuery.date = { ...finalQuery.date, $lte: new Date(query.endDate) };
  }
  return finalQuery;
};
