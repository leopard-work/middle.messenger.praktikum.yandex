const dateParse = (date: string) => {
  const n = new Date(date);
  return n.toLocaleString();
};

export default dateParse;
