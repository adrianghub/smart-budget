export const displayCurrentMonth = () => {
  const today = new Date(),
    y = today.getFullYear(),
    m = today.getMonth();

  return `${new Date(y, m, 1).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  })} - ${new Date(y, m + 1, 0).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })} (current month)`;
};
