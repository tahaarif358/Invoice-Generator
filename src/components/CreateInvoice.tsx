import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { PlusCircle, ImageIcon, Eye, Send, Trash2 } from 'lucide-react';
import { LineItem } from '@/src/types';

export default function CreateInvoice() {
  const [formData, setFormData] = useState({
    sender: { name: '', email: '' },
    client: { name: '', email: '', address: '' },
    reference: 'INV-2024-042',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Brand Identity Design Phase 1', quantity: 1, rate: 2500.00 },
    { id: '2', description: 'UI/UX Prototype Development', quantity: 40, rate: 75.00 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, rate: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const tax = subtotal * 0.1;
    return { subtotal, tax, total: subtotal + tax };
  }, [items]);

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12 bg-surface pb-40">
      <header className="flex justify-between items-end border-b border-primary pb-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-bold mb-3 block">Document</span>
          <h1 className="text-6xl font-headline font-bold text-on-surface tracking-tighter uppercase leading-[0.85]">
            Create <span className="serif-italic tracking-normal">New.</span>
          </h1>
          <p className="text-on-surface-variant mt-6 text-sm max-w-sm leading-relaxed opacity-80 font-medium">Draft a professional billing resource with architectural precision.</p>
        </div>
        <div className="flex gap-4">
          <button className="editorial-border text-primary px-8 py-4 font-bold transition-all hover:bg-primary hover:text-white uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
            <Eye size={14} />
            Preview
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 editorial-border bg-white divide-x divide-primary">
        {/* Left Form Column */}
        <div className="lg:col-span-8 p-12 space-y-12">
          {/* Section: Issuer & Client */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Originating From</label>
              <div className="editorial-border p-8 bg-surface-container-low transition-colors hover:bg-surface-container-high group">
                <div className="h-10 w-10 editorial-border flex items-center justify-center mb-6 grayscale group-hover:bg-primary group-hover:text-white transition-all">
                  <ImageIcon size={16} />
                </div>
                <input 
                  type="text" 
                  value={formData.sender.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, sender: { ...prev.sender, name: e.target.value } }))}
                  placeholder="Organization Identifier"
                  className="w-full bg-transparent border-b border-primary/20 focus:border-primary text-sm font-bold uppercase tracking-widest py-2 outline-none placeholder:text-on-surface-variant/30"
                />
                <input 
                  type="email" 
                  value={formData.sender.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, sender: { ...prev.sender, email: e.target.value } }))}
                  placeholder="Primary Email"
                  className="w-full bg-transparent border-b border-primary/10 focus:border-primary text-[10px] mt-2 font-medium tracking-tight py-2 outline-none italic placeholder:text-on-surface-variant/30 text-on-surface-variant"
                />
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Recipient Entity</label>
              <div className="editorial-border p-8 transition-colors hover:bg-surface-container-low">
                <input 
                  type="text" 
                  value={formData.client.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client: { ...prev.client, name: e.target.value } }))}
                  placeholder="Full Name / Company"
                  className="w-full bg-transparent border-b border-primary/20 focus:border-primary text-sm font-bold uppercase tracking-widest py-2 outline-none placeholder:text-on-surface-variant/30"
                />
                <input 
                  type="email" 
                  value={formData.client.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, client: { ...prev.client, email: e.target.value } }))}
                  placeholder="client@corporate.com"
                  className="w-full bg-transparent border-b border-primary/10 focus:border-primary text-[10px] mt-2 font-medium tracking-tight py-2 outline-none italic placeholder:text-on-surface-variant/30 text-on-surface-variant"
                />
              </div>
            </div>
          </div>

          {/* Section: Line Items */}
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-primary pb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Resource Allocation</h3>
              <button 
                onClick={addItem}
                className="text-primary text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:line-through transition-all"
              >
                <PlusCircle size={14} /> Add Resource
              </button>
            </div>
            
            <div className="space-y-0 divide-y divide-primary/10">
              {items.map((item, index) => (
                <div key={item.id} className="py-8 flex flex-col md:flex-row gap-8 items-end group transition-colors hover:bg-surface-container-low px-4 -mx-4">
                  <div className="flex-1 space-y-4">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">Description</label>
                    <input 
                      type="text" 
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full bg-transparent border-b border-primary/20 focus:border-primary text-sm font-bold uppercase tracking-widest py-2 outline-none"
                      placeholder="Service description"
                    />
                  </div>
                  <div className="w-24 space-y-4">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">Qty</label>
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-primary/20 focus:border-primary text-sm font-bold tracking-tighter py-2 outline-none text-center"
                    />
                  </div>
                  <div className="w-40 space-y-4">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">Unit Rate</label>
                    <input 
                      type="number" 
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-primary/20 focus:border-primary text-sm font-bold tracking-tighter py-2 outline-none text-right"
                    />
                  </div>
                  <div className="w-32 text-right pb-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 block mb-4">Net</span>
                    <span className="text-lg font-headline font-bold text-on-surface tracking-tighter">${(item.quantity * item.rate).toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="pb-2 text-on-surface-variant/20 hover:text-error transition-colors p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-4 p-12 bg-surface-container-low space-y-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant border-b border-primary/20 pb-4">Chronology</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">Reference Code</label>
                <input 
                  type="text" 
                  value={formData.reference}
                  onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                  className="w-full bg-transparent border border-primary/20 p-4 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">Issuance Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-transparent border border-primary/20 p-4 text-[11px] uppercase tracking-widest outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8 pt-12 border-t border-primary/20">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Valuation</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="text-on-surface-variant">Net Sum</span>
                <span className="text-on-surface font-bold font-headline tracking-tight">${totals.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="text-on-surface-variant">Levy (10%)</span>
                <span className="text-on-surface font-bold font-headline tracking-tight">${totals.tax.toLocaleString()}</span>
              </div>
              <div className="pt-6 border-t border-primary flex justify-between items-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Grand Valuation</span>
                <span className="text-5xl font-headline font-bold text-on-surface tracking-tighter leading-none">${totals.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 block">Annotation</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Internal notes or project context..."
              className="w-full h-32 bg-transparent border border-primary/20 p-4 text-[10px] font-medium uppercase tracking-widest outline-none focus:border-primary resize-none leading-relaxed"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-12 right-12 z-50 flex gap-4">
        <button 
          className="h-16 px-10 editorial-border bg-surface text-primary flex items-center justify-center font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-xl"
        >
          Save Draft
        </button>
        <button 
          className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl group border-4 border-surface"
        >
          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          <span className="sr-only">Distribute</span>
        </button>
      </div>
    </div>
  );
}
