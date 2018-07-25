import styled from "styled-components";

export const FixedNavbar = styled.div`
  width: 100%;
  position: ${props => props.theme.position};
  top: ${props => props.theme.top};
  color: ${props => props.theme.color};
  z-index: ${props => props.theme.zIndex};
  border-bottom: ${props => props.theme.borderBottom};
`;

export const Nav = styled.div`
  width: 100%;
  background-color: #fff;
  position: ${props => props.theme.position};
  top: ${props => props.theme.top};
  color: ${props => props.theme.color};
  z-index: ${props => props.theme.zIndex};
  border-bottom: ${props => props.theme.borderBottom};
`;

export const NavList = styled.ul`
  display: flex;
  background-color: #fff;
`;

export const NavListItem = styled.li`
  cursor: pointer;
  font-size: ${props => (props.theme.fontSize ? props.theme.fontSize : "2rem")};
  padding: 1rem 3rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 80%;
    left: 50%;
    width: ${props => (props.active === true ? "60%" : "0%")};
    transform: translateX(-50%);
    height: 2px;
    background-color: ${props => props.theme.ItemBgColor};
    transition: all 0.2s;
  }

  &:hover::before {
    width: 60%;
  }
  &:hover {
    background-color: ${props => props.theme.bgHoverColor};
    color: ${props => props.theme.hoverColor};
  }
`;
