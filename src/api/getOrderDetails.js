export const getOrderDetails = async (orderID) => {
  const response = await fetch(`/api/past-order/${orderID}`);
  return await response.json();
};
