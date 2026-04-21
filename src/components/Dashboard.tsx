import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_INVOICES } from '../mockData';
import StatusChip from './StatusChip';

const data = [
  { month: 'JAN', revenue: 42000, active: false },
  { month: 'FEB', revenue: 68000, active: false },
  { month: 'MAR', revenue: 58000, active: false },
  { month: 'APR', revenue: 89000, active: false },
  { month: 'MAY', revenue: 112000, active: true },
  { month: 'JUN', revenue: 74000, active: false },
];

export interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12 bg-surface">
      <header className="flex justify-between items-end border-b border-primary pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-bold mb-3 block">Perspective</span>
          <h2 className="text-6xl font-headline font-bold text-on-surface tracking-tighter uppercase leading-[0.85]">
            Pure <span className="serif-italic tracking-normal">Form.</span>
          </h2>
          <p className="text-on-surface-variant mt-6 text-sm max-w-sm leading-relaxed opacity-80 font-medium">An exploration of architectural reductionism and the philosophy of essential space in modern residential design.</p>
        </div>
        <button className="editorial-border text-primary px-8 py-4 font-bold transition-all hover:bg-primary hover:text-white uppercase text-[10px] tracking-[0.2em] active:scale-95">
          Export Archive
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 editorial-border divide-x divide-primary">
        {[
          { label: 'Total Billed', value: '142,420', suffix: '.00', trend: '+8.4%' },
          { label: 'Pending Amount', value: '28,950', suffix: '.00', trend: '12 Items' },
          { label: 'Paid Invoices', value: '113,470', suffix: '.00', trend: '94% Rate' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 transition-colors hover:bg-surface-container-low cursor-default"
          >
            <div className="flex justify-between items-start mb-12">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">{stat.label}</span>
              <span className="text-[9px] font-bold px-2 py-1 editorial-border uppercase text-primary bg-white">{stat.trend}</span>
            </div>
            <h3 className="text-5xl font-headline font-bold text-on-surface tracking-tighter">
              <span className="text-2xl font-serif italic mr-1">$</span>
              {stat.value}<span className="text-xl opacity-30">{stat.suffix}</span>
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 editorial-border overflow-hidden">
        {/* Chart Section */}
        <div className="lg:col-span-2 p-12 border-r border-primary">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-on-surface-variant block mb-2">Metrics</span>
              <h3 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">Revenue <span className="serif-italic lowercase tracking-wide font-normal">analysis</span></h3>
            </div>
            <select className="bg-transparent border border-primary/20 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 focus:ring-0 h-10 outline-none cursor-pointer hover:border-primary transition-colors">
              <option>Last Quarter</option>
              <option>Fiscal Year</option>
            </select>
          </div>
          <div className="h-64 mt-4">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="1 1" vertical={false} stroke="#1a1a1a" strokeOpacity={0.1} />
                 <XAxis 
                   dataKey="month" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 9, fontWeight: 700, fill: '#1a1a1a', letterSpacing: 2 }} 
                   dy={15}
                 />
                 <Tooltip 
                   cursor={{ fill: '#1a1a1a', fillOpacity: 0.05 }}
                   content={({ active, payload }) => {
                     if (active && payload && payload.length) {
                       return (
                         <div className="bg-primary text-white p-3 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                            <span className="opacity-60 block mb-1 text-[8px]">VALUATION</span>
                            ${payload[0].value?.toLocaleString()}
                         </div>
                       );
                     }
                     return null;
                   }}
                 />
                 <Bar dataKey="revenue" radius={0} barSize={40}>
                   {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.active ? '#1a1a1a' : '#e5e5e1'} className="transition-all hover:opacity-80" />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Live Status Card */}
        <div className="lg:col-span-1 bg-primary p-12 text-white flex flex-col justify-center">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 block mb-3">Service Status</span>
          <h3 className="text-5xl font-headline font-bold mb-2 uppercase leading-[0.85] tracking-tighter">Essential <br/><span className="serif-italic lowercase font-normal tracking-wide text-white/90">space.</span></h3>
          <p className="text-white/40 text-[11px] mt-6 leading-relaxed max-w-[200px]">How negative space defines our daily interactions and creates a sense of sanctuary.</p>
          
          <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Backups</span>
              <span className="text-[9px] font-bold bg-white text-primary px-2 py-0.5 uppercase shadow-sm">Sync</span>
            </div>
            
            <div className="flex justify-between items-center text-white/40">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Capacity</span>
              <span className="text-[9px] font-bold uppercase tracking-widest font-mono">8.2 / 50 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="editorial-border p-12">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">Recent <span className="serif-italic font-normal lowercase tracking-wide">entries</span></h3>
          <button 
            onClick={() => onNavigate?.('invoices')}
            className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:line-through transition-all active:opacity-60"
          >
            View All Entries
          </button>
        </div>

        <div className="divide-y divide-primary/10">
           {MOCK_INVOICES.slice(0, 3).map((invoice, i) => (
             <div key={invoice.id} className="flex items-center justify-between py-10 transition-colors hover:bg-surface-container-low group px-4 -mx-4 cursor-pointer" onClick={() => onNavigate?.('invoices')}>
               <div className="flex items-center gap-10">
                 <span className="text-[10px] font-bold text-on-surface-variant opacity-30">0{i+1}</span>
                 <div>
                   <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider group-hover:text-primary transition-colors">{invoice.client.name}</h4>
                   <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1 opacity-50">{invoice.number}</p>
                 </div>
               </div>
               
               <div className="text-center hidden md:block">
                 <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-1 opacity-40">Period</p>
                 <p className="text-[10px] font-bold text-on-surface uppercase tracking-widest">{invoice.date}</p>
               </div>

               <div className="text-right flex items-center gap-12">
                 <div className="text-right">
                   <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-1 opacity-40">Valuation</p>
                   <p className="text-2xl font-headline font-bold text-on-surface tracking-tighter">${invoice.items[0].rate.toLocaleString()}</p>
                 </div>
                 <StatusChip status={invoice.status} className="border border-primary bg-transparent text-primary" />
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Floating Action Circle */}
      <div className="fixed bottom-12 right-12 z-50">
        <button 
          onClick={() => onNavigate?.('create')}
          className="w-24 h-24 rounded-full border-4 border-surface bg-primary text-white flex flex-col items-center justify-center font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl group"
        >
          <Plus size={20} className="mb-1 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Entry</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
