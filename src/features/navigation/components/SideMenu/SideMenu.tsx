import { Box, Divider, Drawer, List, useMediaQuery, useTheme } from '@mui/material';
import { DRAWER_WIDTH_COLLAPSED, DRAWER_WIDTH_EXPANDED } from './styles';

import React from 'react';
import { SideMenuDropdown } from './SideMenuDropdown';
import { SideMenuHeader } from './SideMenuHeader';
import { SideMenuItem } from './SideMenuItem';
import type { SideMenuProps } from '@/features/navigation/types';
import { resolveIcon as defaultResolveIcon } from '@/features/navigation/utils/resolveIcon';
import { useMenu } from '@/features/navigation/hooks/useMenu';

export const SideMenu = (props: SideMenuProps) => {
  const {
    items,
    roles,
    locale = 'en',
    activePath,
    collapsed,
    mobileOpen,
    onMobileOpenChange,
    companyLogo,
    companyName,
    LinkComponent,
    linkAdapter,
    iconResolver,
    widths,
    className,
    sx
  } = props;

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { menu, isActivePath, /* isSectionActive,*/ openState, toggle } = useMenu(items, roles, locale, activePath);
  const resolveIcon = iconResolver ?? defaultResolveIcon;

  const drawerWidth = (widths?.expanded ?? DRAWER_WIDTH_EXPANDED);
  const collapsedWidth = (widths?.collapsed ?? DRAWER_WIDTH_COLLAPSED);
  const currentWidth = mdUp ? (collapsed ? collapsedWidth : drawerWidth) : drawerWidth;

  const drawerContent = (
    <Box role="navigation" aria-label="Primary" sx={{ width: currentWidth, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SideMenuHeader companyLogo={companyLogo} companyName={companyName} collapsed={mdUp ? collapsed : false} />
      <Divider />
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <List role="menu" sx={{ py: 0 }}>
          {menu.map((item) => {
            const iconNode = resolveIcon(item.icon);
            if (item.children && item.children.length > 0) {
              const open = Boolean(openState[item.id]);
              return (
                <SideMenuDropdown
                  key={item.id}
                  item={item}
                  collapsed={mdUp ? collapsed : false}
                  open={open}
                  onToggle={() => toggle(item.id)}
                  isActivePath={isActivePath}
                  iconNode={iconNode}
                  LinkComponent={LinkComponent}
                  linkAdapter={linkAdapter}
                />
              );
            }
            return (
              <SideMenuItem
                key={item.id}
                label={item.label}
                path={item.path!}
                iconNode={iconNode}
                active={isActivePath(item.path)}
                collapsed={mdUp ? collapsed : false}
                LinkComponent={LinkComponent}
                linkAdapter={linkAdapter}
              />
            );
          })}
        </List>
      </Box>
      <Divider />
      <Box px={2} py={1.5}>
        {/* Footer slot left intentionally minimal */}
      </Box>
    </Box>
  );

  if (mdUp) {
    return (
      <Drawer
        variant="permanent"
        open
        className={className}
        sx={{
          width: currentWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: currentWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create(['width', 'margin', 'transform'], {
              duration: theme.transitions.duration.shorter
            })
          },
          ...sx
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={() => onMobileOpenChange(false)}
      ModalProps={{ keepMounted: true }}
      className={className}
      sx={{
        '& .MuiDrawer-paper': {
          width: currentWidth,
          boxSizing: 'border-box'
        },
        ...sx
      }}
    >
      {drawerContent}
    </Drawer>
  );
};


