import type {ExpanseStatus} from "@/app/(main)/_data-layer/expanse-statuses-mock";

export interface Expanse extends Omit<ExpanseDto, "status"> {
  status: ExpanseStatus;
}

export interface ExpanseDto {
  id: string;
  title: string;
  userId: string;
  amount: Amount;
  category: Category;
  issueDate: string;
  fvRefUrl?: string;
  status: ExpanseStatusDto;
}

export enum ExpanseStatusDto {
  PAID = "PAID",
  UNPAID = "UNPAID",
  PENDING = "PENDING",
}

type Amount = number;
type Category = string;
