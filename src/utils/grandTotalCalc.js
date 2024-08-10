export const calcGrandTotal = ({ products, tax }) => {
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
  const convtax = parseFloat(tax);
  total = total + (total * convtax) / 100;
  return total;
};
