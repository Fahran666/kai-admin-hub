import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "on-time" | "delayed" | "arrived" | "pending" | "approved" | "rejected";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<
  Status,
  { label: string; className: string }
> = {
  "on-time": {
    label: "On Time",
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  delayed: {
    label: "Delayed",
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  arrived: {
    label: "Arrived",
    className: "bg-info/10 text-info hover:bg-info/20",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  approved: {
    label: "Approved",
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, "font-medium", className)}>
      {config.label}
    </Badge>
  );
};
