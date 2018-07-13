import React, { Component } from "react";
import { Container } from "../../../theme/style";
import { color } from "../../../theme/color";
import { ThemeProvider } from "styled-components";
import { FixedNavbar, NavList, NavListItem } from "../../navbar/NavBar.style";

export class OverviewFixedNavbar extends Component {
  render() {
    return (
      <ThemeProvider
        theme={{
          top: "50px",
          color: color.orange,
          borderBottom: `1px solid ${color.grey}`,
          bgColor: color.orange,
          bgHoverColor: color.lightGrey
        }}
      >
        <FixedNavbar>
          <Container>
            <NavList>
              <NavListItem>Overview</NavListItem>
              <NavListItem>Guide</NavListItem>
              <NavListItem>Review</NavListItem>
              <NavListItem>Gallery</NavListItem>
            </NavList>
          </Container>
        </FixedNavbar>
      </ThemeProvider>
    );
  }
}

export default OverviewFixedNavbar;
