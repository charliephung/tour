const indexOfMin = (arr, { absolute }) => {
  switch (absolute) {
    case true:
      arr = arr.map(ele => Math.abs(ele));
      return arr.indexOf(Math.min(...arr));

    default:
      return arr.indexOf(Math.min(...arr));
  }
};

export default indexOfMin;
