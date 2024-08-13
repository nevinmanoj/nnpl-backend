export const formatDocListQuery = (query) => {
  if (query.customer) {
    query = { ...query, "customer.title": query.customer };
    delete query.customer;
  }
  if (query.distributor) {
    query = { ...query, "distributor.title": query.distributor };
    delete query.distributor;
  }
  if (query.startDate) {
    query.date = { ...query.date, $gte: new Date(query.startDate) };
    delete query.startDate;
  }
  if (query.endDate) {
    query.date = { ...query.date, $lte: new Date(query.endDate) };
    delete query.endDate;
  }
  return query;
};
