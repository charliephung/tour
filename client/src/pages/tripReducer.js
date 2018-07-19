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
