import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideMenu } from '@/features/navigation/components/SideMenu/SideMenu';
import type { MenuItemInput, Role } from '@/features/navigation/types';
import { ThemeProvider, CssBaseline, createTheme, Box, Button } from '@mui/material';

const menuData: { availableItems: MenuItemInput[] } = {
  availableItems: [
    { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: 'eva:home-outline', labelKey: 'header.menu.dashboard' },
    { id: 'clients', name: 'Clients', path: '/clients', icon: 'eva:people-outline', labelKey: 'header.menu.clients' },
    { id: 'investments', name: 'Investments', path: '/investments', icon: 'eva:home-outline', labelKey: 'header.menu.investments', allowedRoles: ['agent','admin','superAdmin'] },
    { id: 'settings', name: 'Settings', path: '/settings', icon: 'eva:settings-2-outline', labelKey: 'header.menu.settings', allowedRoles: ['admin','superAdmin'] },
    { id: 'admin', name: 'Admin Panel', path: '/admin', icon: 'eva:person-outline', labelKey: 'header.menu.admin', allowedRoles: ['superAdmin'] }
  ]
};

const meta = {
  title: 'Navigation/SideMenu',
  component: SideMenu
} satisfies Meta<typeof SideMenu>;

export default meta;
export type Story = StoryObj<typeof meta>;

function ThemeDecorator({ mode = 'light', children }: { mode?: 'light' | 'dark'; children: React.ReactNode }) {
  return (
    <ThemeProvider theme={createTheme({ palette: { mode } })}>
      <CssBaseline />
      <Box display="flex" width="100%" height="100vh">
        {children}
      </Box>
    </ThemeProvider>
  );
}

function MockLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <span data-to={to}>{children}</span>;
}

type TemplateProps = { collapsedDefault?: boolean; mobile?: boolean; roles?: Role[] };

function TemplateComponent({ collapsedDefault = false, mobile = false, roles = ['agent'] as Role[] }: TemplateProps) {
  const [collapsed, setCollapsed] = useState(collapsedDefault);
  const [mobileOpen, setMobileOpen] = useState(mobile);
  const [activePath, setActivePath] = useState('/dashboard');
  const items = menuData.availableItems;
  return (
    <ThemeDecorator mode="light">
      <>
        {mobile && (
          <Box p={2}>
            <Button variant="contained" onClick={() => setMobileOpen(true)}>Open menu</Button>
          </Box>
        )}
        <SideMenu
          items={items}
          roles={roles}
          activePath={activePath}
          locale="en"
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((v) => !v)}
          mobileOpen={mobileOpen}
          onMobileOpenChange={setMobileOpen}
          companyLogo={<Box width={32} height={32} bgcolor="primary.main" borderRadius={1} />}
          companyName="Company"
          LinkComponent={MockLink}
        />
        <Box p={2}>
          <Button onClick={() => setActivePath('/dashboard')}>Go Dashboard</Button>
          <Button onClick={() => setActivePath('/clients')}>Go Clients</Button>
          <Button onClick={() => setActivePath('/investments')}>Go Investments</Button>
          <Button onClick={() => setActivePath('/settings')}>Go Settings</Button>
          <Button onClick={() => setActivePath('/admin')}>Go Admin</Button>
          <Button onClick={() => setCollapsed((c) => !c)}>Toggle collapsed</Button>
        </Box>
      </>
    </ThemeDecorator>
  );
}

export const Mobile: Story = {
  render: () => <TemplateComponent mobile />
};

export const DesktopExpanded: Story = {
  render: () => <TemplateComponent collapsedDefault={false} />
};

export const DesktopCollapsed: Story = {
  render: () => <TemplateComponent collapsedDefault />
};

export const DarkMode: Story = {
  render: () => (
    <ThemeDecorator mode="dark">
      <TemplateComponent collapsedDefault={false} />
    </ThemeDecorator>
  )
};


