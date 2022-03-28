import React from 'react';
import styled from 'styled-components';

type CenterLayout = {
  children: React.ReactChild;
};

const CenterLayout = ({ children }: CenterLayout) => {
  return <Grid>{children}</Grid>;
};

const Grid = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0px 0px 0px;
`;

export { CenterLayout };
