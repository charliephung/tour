import styled from "styled-components";
import { media } from "../../theme/style";
export const Card = styled.div`
  width: 350px;
  ${media.phone`width: 320px;`};
  ${media.smallPhone`width: 300px;`};
  overflow: hidden;
  height: 100%;
  background-color: #fff;
  font-size: 2rem;
  text-align: center;
  padding: 3rem 0.5rem;
  transition: all 0.3s;

  &:hover {
    ${props => props.theme.hover};
  }
`;
