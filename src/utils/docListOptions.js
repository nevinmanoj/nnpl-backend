export const DocListOptions = (data) => {
  return data.map((doc, i) => {
    return {
      grandTotal: doc.grandTotal,
      ref: doc.ref,
      status: doc.status,
      date: doc.date,
      customer: doc.customer?.title,
      distributor: doc.distributor?.title,
      _id: doc._id,
    };
  });
};
