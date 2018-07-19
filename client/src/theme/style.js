import styled, { css, injectGlobal } from "styled-components";
import { color } from "./color";

export const sizes = {
  desktop: 1440,
  tablet: 1000,
  phone: 650,
  smallPhone: 550
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

injectGlobal`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
    list-style: none;
    color: ${color.lightGrey};
  }

  *:link,
  *:visited {
    text-decoration: none;
    text-transform: none;
    color: ${color.lightGrey};
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: sans-serif;
    ${media.tablet`font-size: 50%;`}
    ${media.phone`font-size: 40%;`}
    ${media.smallPhone`font-size: 35%;`}
  }
  .fa-star:before {
    color: #efc05e;
  }
`;

export const flex = css`
  display: ${props => props.theme.display};
  flex-direction: ${props => props.theme.flexDirection};
  flex-wrap: ${props => props.theme.flexWrap};
  flex-flow: ${props => props.theme.flexFlow};
  justify-content: ${props => props.theme.justifyContent};
  align-items: ${props => props.theme.alignItems};
  align-content: ${props => props.theme.alignContent};
`;

export const options = css`
  background: ${props => props.theme.background};
  margin: ${props => props.theme.margin};
  padding: ${props => props.theme.padding};
`;

export const Container = styled.div`
  min-width: 32rem;
  max-width: 140rem;
  margin: auto;
  padding: 1rem 0;
  ${flex};
`;

export const Row = styled.div`
  width: 100%;
  ${flex};
  ${options};
  ${media.tablet`display : block;`};
`;
export const Col = styled.div`
  width: ${props => props.theme.col};

  ${flex};
  ${options};
  ${media.tablet`width : 100%;`};
`;
export const Text = styled.p`
  font-size: ${props => props.theme.fontSize};
  padding-bottom: 1rem;
`;

export const Button = styled.button`
  border: none;
  padding: 1.8rem 3rem;
  font-size: 1.6rem;
  transition: all 0.2s;
  display: inline-block;
  background-color: ${props => props.theme.bgColor};
  cursor: pointer;
  color: white;
  &:hover {
    outline: none;
    box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.5);
  }
  &:active {
    outline: none;
    border: none;
    box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0);
  }

  display: ${props => props.theme.display};
  width: ${props => props.theme.width};
`;
