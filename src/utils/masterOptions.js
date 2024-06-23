export const masterOptions = (data) => {
  return data.map((obj) => {
    return {
      value: obj._id,
      label: obj.title,
    };
  });
};
