import type {ExpanseStatus} from "@/app/(main)/_data-layer/expanse-statuses-mock";

export interface Expanse {
  id: string;
  title: string;
  userId: string;
  amount: number;
  category: ExpanseCategory;
  issueDate: string;
  fvRefUrl?: string;
  status: ExpanseStatus;
}

export interface ExpanseDto {
  id: string;
  title: string;
  userId: string;
  amount: Amount;
  category: string;
  issue_date: string;
  fv_ref_url?: string;
  status: ExpanseStatusDto;
}

export enum ExpanseStatusDto {
  PAID = "PAID",
  UNPAID = "UNPAID",
  PENDING = "PENDING",
}

export type ExpanseCategory = {
  value: string;
  label: string;
};

type Amount = number;
