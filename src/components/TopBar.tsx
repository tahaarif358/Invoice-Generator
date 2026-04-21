import { Search, Bell, Moon, LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-surface flex justify-between items-center h-20 px-10 ml-64 border-b border-primary">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={14} />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-primary/20 focus:border-primary rounded-none text-[11px] uppercase tracking-wider focus:ring-0 placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex gap-8 font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
          <a href="#" className="text-on-surface hover:line-through transition-all">Archive</a>
          <a href="#" className="text-on-surface hover:line-through transition-all">Essays</a>
          <a href="#" className="text-on-surface hover:line-through transition-all">About</a>
        </nav>

        <div className="h-4 w-px bg-primary px-0"></div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface hover:bg-surface-container-high transition-colors">
            <Bell size={18} />
          </button>
          
          <div className="ml-2 flex items-center gap-4 pl-4 cursor-pointer group border-l border-primary/10">
             <div className="text-right hidden sm:block">
               <p className="text-[10px] font-bold uppercase tracking-widest leading-none">A. Morgan</p>
               <p className="text-[9px] text-on-surface-variant uppercase mt-1">Founder</p>
             </div>
             <div className="w-9 h-9 border border-primary p-0.5 grayscale">
                <img
                  src="https://picsum.photos/seed/alex/100/100"
                  alt="User"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
