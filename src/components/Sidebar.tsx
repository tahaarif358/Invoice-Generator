import { LayoutDashboard, FileText, Users, BarChart3, Settings, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ currentTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-8 px-4 bg-surface border-r border-primary z-50 overflow-hidden">
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-headline font-bold text-primary tracking-tight uppercase leading-none">
          Aesthetic<span className="serif-italic lowercase tracking-tighter">.</span>
        </h1>
        <p className="font-sans text-[10px] text-on-surface-variant font-semibold mt-1 uppercase tracking-widest opacity-60">Ledger Edition</p>
      </div>

      <nav className="flex-1 space-y-0.5">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 font-sans text-[11px] uppercase tracking-wider relative group",
                isActive 
                  ? "bg-primary text-white font-bold" 
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              )}
            >
              <Icon size={16} className={cn(isActive ? "text-white" : "text-on-surface-variant group-hover:text-primary")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-2">
        <div className="flex flex-col gap-4 mb-8">
           <div className="writing-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant/40 flex items-center gap-12 whitespace-nowrap px-4">
             <span>Issue No. 042</span>
             <span>Curated Excellence</span>
             <span>© 2024</span>
           </div>
        </div>
        <button 
          onClick={() => onTabChange('create')}
          className="w-full bg-primary text-white py-4 px-4 font-bold font-sans text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-container transition-all"
        >
          <Plus size={16} strokeWidth={3} />
          Create Document
        </button>
      </div>
    </aside>
  );
}
