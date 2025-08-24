import type React from 'react';
import type { SxProps } from '@mui/material';

export type Role = string;

export interface MenuItemInput {
  id: string;
  name: string;
  labelKey?: string;
  path?: string;
  icon?: string;
  allowedRoles?: string[];
  children?: Omit<MenuItemInput, 'children'>[];
}

export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: Omit<MenuItem, 'children'>[];
}

export interface SideMenuWidths {
  expanded: number;
  collapsed: number;
}

export interface SideMenuProps {
  items: MenuItemInput[];
  roles: Role[];
  locale?: string;
  activePath: string;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  companyLogo: React.ReactNode;
  companyName?: string;
  LinkComponent?: React.ComponentType<{ to: string; children: React.ReactNode }>;
  linkAdapter?: (path: string, children: React.ReactNode) => React.ReactNode;
  iconResolver?: (iconName?: string) => React.ReactNode;
  widths?: SideMenuWidths;
  className?: string;
  sx?: SxProps;
}


