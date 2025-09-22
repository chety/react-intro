export const getPastOrders = async (page) => {
  const response = await fetch(`/api/past-orders?page=${page}`);
  return await response.json();
};
