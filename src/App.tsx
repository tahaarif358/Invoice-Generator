/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import InvoiceHistory from './components/InvoiceHistory';
import CreateInvoice from './components/CreateInvoice';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" onNavigate={setCurrentTab} />;
      case 'invoices':
        return <InvoiceHistory key="invoices" />;
      case 'create':
        return <CreateInvoice key="create" />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-on-surface-variant font-headline font-bold text-xl uppercase tracking-widest opacity-30">
            {currentTab} Screen Coming Soon
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <main className="ml-64 min-h-screen">
        <TopBar />
        
        <div className="pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

