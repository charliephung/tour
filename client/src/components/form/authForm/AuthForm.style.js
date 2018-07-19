import styled from "styled-components";
import { media, options } from "../../../theme/style";

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

  ${media.tablet`width: 70vw;`};
  ${media.phone`width: 80vw;`};
`;

export const FormGroup = styled.div`
  padding-bottom: 1rem;
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
  ${options};
`;
