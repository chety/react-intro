const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (price) => {
  return intl.format(price);
};
