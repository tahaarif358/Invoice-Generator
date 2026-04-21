import { cn } from '@/src/lib/utils';
import { InvoiceStatus } from '@/src/types';

interface StatusChipProps {
  status: InvoiceStatus;
  className?: string;
}

export default function StatusChip({ status, className }: StatusChipProps) {
  const styles = {
    Paid: "text-primary border-primary",
    Sent: "text-primary border-primary opacity-60",
    Overdue: "text-error border-error",
    Draft: "text-on-surface-variant border-primary/20",
    Archived: "text-on-surface-variant border-primary/10",
  };

  return (
    <span className={cn(
      "px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] border leading-none inline-flex items-center justify-center",
      styles[status],
      className
    )}>
      {status}
    </span>
  );
}

