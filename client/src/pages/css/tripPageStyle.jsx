export const NavBarStyles = {
  position: "fixed",
  backgroundColor: "#fff",
  gridColumn: "1 / -1",
  display: "grid",
  width: "100%",
  zIndex: "1000",
  gridTemplateColumns: "repeat(8, 1fr)",
  borderBottom: "2px solid rgb(228, 229, 230)"
};

export const NavBarListStyles = {
  gridColumn: "3 / span 4"
};
export const NavBarListStylesMedia = {
  gridColumn: "1 / -1"
};

export const overviewNavListStyle = {
  display: "flex",
  flex: "0 1 0%",
  gridColumn: "3 / span 4"
};

export const overviewNavListStyleMedia = {
  display: "flex",
  flex: "0 1 0%",
  gridColumn: "1 / -1"
};

export const overviewNavPreStyle = {
  gridTemplateColumns: "repeat(8, 1fr)",
  width: "100%",
  position: "fixed",
  top: "0",
  fontSize: "1.8rem",
  display: "grid",
  zIndex: "900",
  transition: "all .2s"
};
export const overviewNavStyleMedia = {
  backgroundColor: "rgb(255, 255, 255)",
  gridTemplateColumns: "repeat(10, 1fr)",
  width: "100%",
  position: "fixed",
  top: "45px",
  fontSize: "1.8rem",
  display: "grid",
  zIndex: "900",
  transition: "all .2s",
  borderBottom: "2px solid rgb(228, 229, 230)"
};
export const overviewNavStyle = {
  backgroundColor: "rgb(255, 255, 255)",
  width: "100%",
  position: "fixed",
  top: "56px",
  fontSize: "1.8rem",
  display: "grid",
  zIndex: "900",
  transition: "all .2s",
  borderBottom: "2px solid rgb(228, 229, 230)"
};

export const bookFormStyle = {
  position: "fixed",
  top: "110px",
  width: "312px",
  transition: "all .2s"
};
