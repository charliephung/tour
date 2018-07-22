export const uiReducer = (initState, condition) => {
  switch (true) {
    case condition.windowWidth > 1000 && condition.uiPosition >= 0:
      return { fixedLayout: false, fixedBook: false };
    case condition.windowWidth > 1000 && condition.uiPosition < 0:
      return { fixedLayout: true, fixedBook: true };
    case condition.windowWidth <= 1000 && condition.uiPosition < 0:
      return { fixedLayout: true, fixedBook: false };
    case condition.windowWidth <= 1000 && condition.uiPosition >= 0:
      return { fixedLayout: false, fixedBook: false };
    default:
      return { ...initState };
  }
};

export const activeIndexReducer = (initState, positions, offsetTop) => {
  let arr = Object.keys(positions).map((ele, index) => {
    return positions[ele].top + offsetTop;
  });
  arr = arr.slice(0, 5);
  const posArr = arr.filter(ele => ele > 0);
  const min = Math.min(...posArr);
  const index = arr.findIndex(ele => ele === min);
  if (index !== initState) {
    return index;
  }
  return initState;
};
