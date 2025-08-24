import { Box, Typography } from '@mui/material';

import React from 'react';

interface Props {
  companyLogo: React.ReactNode;
  companyName?: string;
  collapsed: boolean;
}

export const SideMenuHeader = ({ companyLogo, companyName, collapsed }: Props) => {
  return (
    <Box display="flex" alignItems="center" gap={1.5} px={2} py={1.5}>
      <Box display="flex" alignItems="center">{companyLogo}</Box>
      {!collapsed && (
        <Typography variant="subtitle1" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
          {companyName}
        </Typography>
      )}
    </Box>
  );
};


