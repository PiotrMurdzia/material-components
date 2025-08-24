import { AnimatedListItemButton, getActiveBg } from './styles';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import type { MenuItem, SideMenuProps } from '@/features/navigation/types';
import { createDropdownKeyHandler, getMenuItemAriaProps } from '@/features/navigation/utils/a11y';

import React from 'react';

interface Props {
  item: MenuItem; // with children
  collapsed: boolean;
  open: boolean;
  onToggle: () => void;
  isActivePath: (path?: string) => boolean;
  iconNode: React.ReactNode;
  LinkComponent?: SideMenuProps['LinkComponent'];
  linkAdapter?: SideMenuProps['linkAdapter'];
}

export const SideMenuDropdown = ({ item, collapsed, open, onToggle, isActivePath, iconNode, LinkComponent, linkAdapter }: Props) => {
  const isSectionActive = item.children?.some((c) => isActivePath(c.path));

  const keyHandler = createDropdownKeyHandler({
    onOpen: () => !open && onToggle(),
    onClose: () => open && onToggle(),
    onNext: () => {},
    onPrev: () => {},
    onActivate: onToggle
  });

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <AnimatedListItemButton
          onClick={onToggle}
          onKeyDown={keyHandler}
          {...getMenuItemAriaProps({ isActive: isSectionActive, isExpandable: true, expanded: open, controlsId: `${item.id}-list`, tabIndex: 0 })}
          sx={(theme) => ({ ...(isSectionActive && { backgroundColor: getActiveBg(theme) }) })}
        >
          {iconNode && <ListItemIcon sx={{ minWidth: 40 }}>{iconNode}</ListItemIcon>}
          {!collapsed && <ListItemText primary={item.label} />}
        </AnimatedListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding id={`${item.id}-list`} role="group">
          {item.children?.map((child) => {
            const active = isActivePath(child.path);
            const content = (
              <ListItemButton sx={(theme) => ({ pl: 7, ...(active && { backgroundColor: getActiveBg(theme) }) })}>
                {child.icon && <ListItemIcon sx={{ minWidth: 40 }} />}
                <ListItemText primary={child.label} />
              </ListItemButton>
            );
            const wrapped = child.path
              ? LinkComponent
                ? (<LinkComponent to={child.path}>{content}</LinkComponent>)
                : linkAdapter
                ? linkAdapter(child.path, content)
                : content
              : content;
            return (
              <ListItem disablePadding key={child.id} sx={{ display: 'block' }}>
                {wrapped}
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};


