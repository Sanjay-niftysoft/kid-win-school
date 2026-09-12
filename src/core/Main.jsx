import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-amber-400 selection:text-slate-900 relative">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Main;
