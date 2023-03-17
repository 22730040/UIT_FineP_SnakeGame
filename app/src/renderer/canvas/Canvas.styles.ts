import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Canvas = styled.canvas`
  border: 10px solid black;
  border-radius: 12px;
  width: 800px;
  height: 400px;
  box-sizing: border-box;
  border-image-slice: 1;
  border-image-source: black;
`;
