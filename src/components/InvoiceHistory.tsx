import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Filter, MoreVertical, ChevronLeft, ChevronRight, Download, Send, Trash2 } from 'lucide-react';
import { MOCK_INVOICES } from '../mockData';
import StatusChip from './StatusChip';
import { cn } from '@/src/lib/utils';
import { InvoiceStatus } from '../types';

export default function InvoiceHistory() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Paid', 'Sent', 'Draft', 'Overdue'];

  const filteredInvoices = useMemo(() => {
    if (activeTab === 'All') return MOCK_INVOICES;
    return MOCK_INVOICES.filter(inv => inv.status.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab]);

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12 bg-surface">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-primary pb-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-bold mb-3 block">Archives</span>
          <h1 className="text-6xl font-headline font-bold text-on-surface tracking-tighter uppercase leading-[0.85]">
            Invoice <span className="serif-italic tracking-normal">History.</span>
          </h1>
          <p className="text-on-surface-variant mt-6 text-sm max-w-sm leading-relaxed opacity-80 font-medium">Manage and track your professional billings from one place.</p>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex editorial-border p-1 bg-white flex-wrap">
             {tabs.map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={cn(
                   "px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                   activeTab === tab 
                    ? "bg-primary text-white" 
                    : "text-on-surface-variant hover:text-primary"
                 )}
               >
                 {tab}
               </button>
             ))}
           </div>
           <button className="p-4 editorial-border text-on-surface hover:bg-primary hover:text-white transition-all">
             <Filter size={16} />
           </button>
        </div>
      </div>


      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 editorial-border divide-x divide-primary">
        {[
          { label: 'Total Outstanding', value: '$12,450.00', color: 'text-primary' },
          { label: 'Received (Month)', value: '$28,120.50', color: 'text-primary' },
          { label: 'Overdue Count', value: '03', color: 'text-error' },
        ].map((item, i) => (
          <div key={i} className="p-10 transition-colors hover:bg-surface-container-low">
            <span className="block text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-4">{item.label}</span>
            <span className={cn("block text-4xl font-headline font-bold tracking-tighter", item.color)}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="editorial-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary">
                <th className="px-10 py-8 text-[9px] font-bold text-on-surface uppercase tracking-[0.3em]">Reference</th>
                <th className="px-10 py-8 text-[9px] font-bold text-on-surface uppercase tracking-[0.3em]">Entity</th>
                <th className="px-10 py-8 text-[9px] font-bold text-on-surface uppercase tracking-[0.3em]">Period</th>
                <th className="px-10 py-8 text-[9px] font-bold text-on-surface uppercase tracking-[0.3em] text-right">Valuation</th>
                <th className="px-10 py-8 text-[9px] font-bold text-on-surface uppercase tracking-[0.3em]">Status</th>
                <th className="px-10 py-8 text-[9px] font-bold text-on-surface uppercase tracking-[0.3em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="group hover:bg-surface-container-low transition-colors">
                  <td className="px-10 py-10 font-headline font-bold text-on-surface uppercase tracking-wider">{invoice.number}</td>
                  <td className="px-10 py-10">
                    <div className="flex items-center gap-6">
                      <div className="h-8 w-8 editorial-border flex items-center justify-center text-[10px] font-bold text-primary grayscale">
                        {invoice.client.avatarIcon}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-on-surface uppercase tracking-widest">{invoice.client.name}</span>
                        <span className="block text-[10px] text-on-surface-variant font-medium mt-1 italic">{invoice.client.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-10 text-[11px] text-on-surface font-bold uppercase tracking-widest">{invoice.date}</td>
                  <td className="px-10 py-10 text-right font-headline font-bold text-on-surface text-xl tracking-tighter">
                    ${invoice.items[0].rate.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-10 py-10">
                    <StatusChip status={invoice.status} className="border border-primary bg-transparent" />
                  </td>
                  <td className="px-10 py-10 text-right">
                    <button className="p-3 text-on-surface hover:bg-primary hover:text-white transition-all editorial-border">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-10 py-20 text-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold opacity-40">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-10 py-10 border-t border-primary flex items-center justify-between">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Displaying {filteredInvoices.length > 0 ? '01' : '00'} — {String(filteredInvoices.length).padStart(2, '0')} / {MOCK_INVOICES.length} entries
          </span>
          <div className="flex gap-4">
            <button className="p-4 editorial-border text-on-surface hover:bg-primary hover:text-white transition-all">
              <ChevronLeft size={16} />
            </button>
            <button className="p-4 editorial-border text-on-surface hover:bg-primary hover:text-white transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>


      {/* Batch Actions Circle */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 glass-panel shadow-2xl rounded-none px-12 py-6 flex items-center gap-12 z-50 ml-32"
      >
        <div className="flex items-center gap-4 border-r border-primary pr-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Selections</span>
          <span className="bg-primary text-white text-[10px] px-2 py-0.5 font-bold uppercase">None</span>
        </div>
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2.5 text-[10px] font-bold text-on-surface hover:line-through transition-all uppercase tracking-widest">
            <Download size={14} />
            Archive
          </button>
          <button className="flex items-center gap-2.5 text-[10px] font-bold text-on-surface hover:line-through transition-all uppercase tracking-widest">
            <Send size={14} />
            Distribute
          </button>
          <button className="flex items-center gap-2.5 text-[10px] font-bold text-error hover:line-through transition-all uppercase tracking-widest">
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </motion.div>
    </div>
  );
}
