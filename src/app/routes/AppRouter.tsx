import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/Home/Home';
import React from 'react';
import { SideMenuLayout } from '@/app/layouts/SideMenuLayout';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideMenuLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/clients" element={<div>Clients</div>} />
          <Route path="/investments" element={<div>Investments</div>} />
          <Route path="/reports/sales" element={<div>Reports - Sales</div>} />
          <Route path="/reports/finance" element={<div>Reports - Finance</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
          <Route path="/admin" element={<div>Admin</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


