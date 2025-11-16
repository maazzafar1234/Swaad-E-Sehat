import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const MainLayout = () => {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <ScrollToTop />
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;