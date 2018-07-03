const isEmpty = data =>
  data === undefined ||
  data === null ||
  data.length === 0 ||
  (typeof data === "object" && Object.keys(data).length === 0);

export default isEmpty;
