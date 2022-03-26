import React from 'react';
import styled from 'styled-components';
import ShareIcon from '@mui/icons-material/Share';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  icon: {
    color: '#FFFFFF',
  },
});

const Share = () => {
  const classes = useStyles();
  return (
    <Circle>
      <ShareIcon className={classes.icon} />
    </Circle>
  );
};

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Share };
