export const calcTotal = (products) => {
  var total = 0.0;
  var qty = 0;
  var rate = 0;
  products.map((prd, i) => {
    try {
      qty = parseFloat(prd["qty"]);
      rate = parseFloat(prd["ratePerUnit"]);
      rate = parseFloat(prd["ratePerUnit"]);
      total = total + qty * rate;
    } catch (error) {}
  });
  return total;
};
