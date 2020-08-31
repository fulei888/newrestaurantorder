import styled from "@emotion/styled";
const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${props => (props.disabled ? "#333":"#aa272f")};
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;
