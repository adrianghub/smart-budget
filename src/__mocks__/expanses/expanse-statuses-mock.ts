import {
  CheckIcon,
  Clock12Icon,
  XSquareIcon,
  type LucideIcon,
} from "lucide-react";

export interface ExpanseStatus {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export const expanseStatuses: ExpanseStatus[] = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock12Icon,
  },
  {
    value: "paid",
    label: "Paid",
    icon: CheckIcon,
  },
  {
    value: "unpaid",
    label: "Unpaid",
    icon: XSquareIcon,
  },
];
