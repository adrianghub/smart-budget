export interface Expanse {
  id: string;
  name: string;
  userId: string;
  amount: Amount;
  category: Category;
  issueDate: string;
  fvRefUrl?: string;
}

type Amount = number;
type Category = string;
