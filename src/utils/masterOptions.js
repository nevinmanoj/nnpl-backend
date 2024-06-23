export const masterOptions = (data, label) => {
  return data.map((obj) => {
    return {
      value: obj._id,
      label: obj[label],
    };
  });
};
