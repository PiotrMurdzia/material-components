import { ListSubheader } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
}

export const SideMenuSection = ({ title }: Props) => {
  return (
    <ListSubheader component="div" disableSticky>
      {title}
    </ListSubheader>
  );
};


