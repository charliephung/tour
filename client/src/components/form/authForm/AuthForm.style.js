import styled from "styled-components";

export const FormContainer = styled.div`
  width: 20vw;
  background-color: white;
  border-radius: 3px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 3rem 2rem;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  border-radius: 3px;
  padding: 0.8em 1.1em;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(230, 230, 230);
  border-image: initial;
`;

export const Button = styled.button`
  border: none;
  padding: 1.8rem 3rem;
  font-size: 1.6rem;
  transition: all 0.2s;
  display: inline-block;
  background-color: transparent;
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

  display: ${props => props.theme.display && props.theme.display};
  width: ${props => props.theme.width && props.theme.width};
  background-color: ${props =>
    props.theme.backgroundColor && props.theme.backgroundColor};
`;
