export type InvoiceStatus = 'Paid' | 'Sent' | 'Overdue' | 'Draft' | 'Archived';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Client {
  name: string;
  email: string;
  address?: string;
  avatarIcon?: string; // Initials or local path
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  client: Client;
  items: LineItem[];
  status: InvoiceStatus;
  notes?: string;
}
