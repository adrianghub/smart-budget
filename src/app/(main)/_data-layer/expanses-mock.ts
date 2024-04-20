import type {Expanse} from "@/app/(main)/_data-layer/expanses";

export const expanses: Expanse[] = [
  {
    id: "728ed52f",
    userId: "1",
    name: "Groceries",
    amount: 100,
    category: "random",
    issueDate: "2021-09-15",
  },
  {
    id: "489e1d42",
    userId: "1",
    name: "Course on Udemy",
    amount: 20,
    category: "career",
    fvRefUrl:
      "https://sp-fv.s3.amazonaws.com/2021/09/15/1631710133-1631110133.png",
    issueDate: "2022-09-15",
  },
  {
    id: "489e1d43",
    name: "Netflix",
    amount: 25,
    userId: "1",
    category: "subscription",
    fvRefUrl:
      "https://sp-fv.s3.amazonaws.com/2021/09/15/1631710133-1631210133.png",
    issueDate: "2023-09-15",
  },
];
