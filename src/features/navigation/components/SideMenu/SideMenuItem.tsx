import { AnimatedListItemButton, getActiveBg } from './styles';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

import React from 'react';
import type { SideMenuProps } from '@/features/navigation/types';
import { getMenuItemAriaProps } from '@/features/navigation/utils/a11y';

interface Props {
  label: string;
  path: string;
  iconNode: React.ReactNode;
  active: boolean;
  collapsed: boolean;
  LinkComponent?: SideMenuProps['LinkComponent'];
  linkAdapter?: SideMenuProps['linkAdapter'];
}

export const SideMenuItem = ({ label, path, iconNode, active, collapsed, LinkComponent, linkAdapter }: Props) => {
  const content = (
    <AnimatedListItemButton
      {...getMenuItemAriaProps({ isActive: active, tabIndex: 0, isExpandable: false })}
      sx={(theme) => ({
        ...(active && { backgroundColor: getActiveBg(theme) })
      })}
    >
      {iconNode && <ListItemIcon sx={{ minWidth: 40 }}>{iconNode}</ListItemIcon>}
      {!collapsed && <ListItemText primary={label} />}
    </AnimatedListItemButton>
  );

  const wrapped = LinkComponent
    ? (<LinkComponent to={path}>{content}</LinkComponent>)
    : linkAdapter
    ? linkAdapter(path, content)
    : content;

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      {collapsed ? (
        <Tooltip title={label} placement="right"><span>{wrapped as React.ReactElement}</span></Tooltip>
      ) : (
        wrapped
      )}
    </ListItem>
  );
};


