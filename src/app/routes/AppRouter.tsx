import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/Home/Home';
import React from 'react';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};


