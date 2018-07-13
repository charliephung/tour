import styled from "styled-components";

export const FixedNavbar = styled.div`
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: ${props => props.theme.top};
  color: ${props => props.theme.color};
  z-index: 900;
  border-bottom: ${props => props.theme.borderBottom};
`;

export const NavList = styled.ul`
  display: flex;
  background-color: #fff;
`;

export const NavListItem = styled.li`
  cursor: pointer;
  font-size: 1.6rem;
  padding: 0.8rem 3rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 80%;
    left: 50%;
    width: 0%;
    transform: translateX(-50%);
    height: 2px;
    background-color: ${props => props.theme.bgColor};
    transition: all 0.2s;
  }

  &:hover::before {
    width: 60%;
  }
  &:hover {
    background-color: ${props => props.theme.bgHoverColor};
  }
`;
