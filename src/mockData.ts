import { Invoice } from './types';

export const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    date: 'Oct 24, 2023',
    dueDate: 'Nov 07, 2023',
    client: {
      name: 'Nexus Systems',
      email: 'billing@nexus.com',
      avatarIcon: 'NS'
    },
    items: [
      { id: 'i1', description: 'Brand Identity Design - 2024', quantity: 1, rate: 4500.00 }
    ],
    status: 'Paid'
  },
  {
    id: '2',
    number: 'INV-2024-002',
    date: 'Oct 28, 2023',
    dueDate: 'Nov 11, 2023',
    client: {
      name: 'Apex Ventures',
      email: 'finance@apex.io',
      avatarIcon: 'AV'
    },
    items: [
      { id: 'i2', description: 'UI/UX Consultation', quantity: 10, rate: 210.00 }
    ],
    status: 'Sent'
  },
  {
    id: '3',
    number: 'INV-2024-003',
    date: 'Nov 01, 2023',
    dueDate: 'Nov 15, 2023',
    client: {
      name: 'Lumina Media',
      email: 'claire@lumina.tv',
      avatarIcon: 'LM'
    },
    items: [
      { id: 'i3', description: 'Social Media Assets', quantity: 1, rate: 1850.00 }
    ],
    status: 'Overdue'
  },
  {
    id: '4',
    number: 'INV-2024-004',
    date: 'Nov 05, 2023',
    dueDate: 'Nov 19, 2023',
    client: {
      name: 'Quantum Code',
      email: 'hello@qcode.dev',
      avatarIcon: 'QC'
    },
    items: [
      { id: 'i4', description: 'Full Stack Development', quantity: 1, rate: 8200.00 }
    ],
    status: 'Paid'
  },
  {
    id: '5',
    number: 'INV-2024-005',
    date: 'Nov 12, 2023',
    dueDate: 'Nov 26, 2023',
    client: {
      name: 'Silver Ground',
      email: 'ops@silverground.com',
      avatarIcon: 'SG'
    },
    items: [
      { id: 'i5', description: 'Graphic Design Retainer', quantity: 1, rate: 3400.00 }
    ],
    status: 'Draft'
  },
];
