import { Box, Button, Container, Stack, useMediaQuery, useTheme } from '@mui/material';
import { DRAWER_WIDTH_COLLAPSED, DRAWER_WIDTH_EXPANDED, SideMenu } from '@/features/navigation/components/SideMenu';
import type { MenuItemInput, Role } from '@/features/navigation/types';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

const sampleItems: MenuItemInput[] = [
  { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: 'eva:home-outline', labelKey: 'header.menu.dashboard' },
  { id: 'clients', name: 'Clients', path: '/clients', icon: 'eva:people-outline', labelKey: 'header.menu.clients' },
  { id: 'investments', name: 'Investments', path: '/investments', icon: 'eva:home-outline', labelKey: 'header.menu.investments', allowedRoles: ['agent','admin','superAdmin'] },
  { id: 'reports', name: 'Reports', icon: 'eva:bar-chart-2-outline', labelKey: 'header.menu.reports', children: [
    { id: 'sales', name: 'Sales', path: '/reports/sales', icon: 'eva:trending-up-outline', labelKey: 'header.menu.reports.sales' },
    { id: 'finance', name: 'Finance', path: '/reports/finance', icon: 'eva:credit-card-outline', labelKey: 'header.menu.reports.finance' }
  ] },
  { id: 'settings', name: 'Settings', path: '/settings', icon: 'eva:settings-2-outline', labelKey: 'header.menu.settings', allowedRoles: ['admin','superAdmin'] },
  { id: 'admin', name: 'Admin Panel', path: '/admin', icon: 'eva:person-outline', labelKey: 'header.menu.admin', allowedRoles: ['superAdmin'] }
];

function LinkAdapter({ to, children }: { to: string; children: React.ReactNode }) {
  return <RouterLink to={to}>{children}</RouterLink>;
}

export const SideMenuLayout = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const roles = useMemo<Role[]>(() => ['agent'], []);

  const leftSpace = mdUp ? (collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED) : 0;

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu
        items={sampleItems}
        roles={roles}
        locale="en"
        activePath={location.pathname}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
        companyLogo={<Box width={28} height={28} borderRadius={1} bgcolor="primary.main" />}
        companyName="Company"
        LinkComponent={LinkAdapter}
      />
      <Box component="main" sx={{ flexGrow: 1, ml: { md: `${leftSpace}px` }, p: 2 }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            {!mdUp && (
              <Button variant="contained" onClick={() => setMobileOpen(true)}>
                Open menu
              </Button>
            )}
            {mdUp && (
              <Button variant="outlined" onClick={() => setCollapsed((v) => !v)}>
                Toggle collapsed
              </Button>
            )}
          </Stack>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};


