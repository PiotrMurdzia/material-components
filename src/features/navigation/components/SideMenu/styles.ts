import { alpha, styled } from '@mui/material/styles';

import { ListItemButton } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export const DRAWER_WIDTH_EXPANDED = 280;
export const DRAWER_WIDTH_COLLAPSED = 72;

export const getActiveBg = (theme: Theme) => alpha(theme.palette.primary.main, 0.12);

export const AnimatedListItemButton = styled(ListItemButton)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'transform', 'background-color'], {
    duration: theme.transitions.duration.shorter
  })
}));


