import {
  ExpanseStatusDto,
  type ExpanseDto,
} from "@/app/(main)/_data-layer/expanse/expanses";

export const expanses: ExpanseDto[] = [
  {
    id: "728ed52f",
    userId: "1",
    title: "Groceries",
    amount: 100,
    category: "random",
    issue_date: "2021-09-15",
    status: ExpanseStatusDto.PAID,
  },
  {
    id: "489e1d42",
    userId: "1",
    title: "Course on Udemy",
    amount: 20,
    category: "career",
    fv_ref_url:
      "https://sp-fv.s3.amazonaws.com/2021/09/15/1631710133-1631110133.png",
    issue_date: "2022-09-15",
    status: ExpanseStatusDto.UNPAID,
  },
  {
    id: "489e1d43",
    title: "Netflix",
    amount: 25,
    userId: "1",
    category: "subscription",
    fv_ref_url:
      "https://sp-fv.s3.amazonaws.com/2021/09/15/1631710133-1631210133.png",
    issue_date: "2023-09-15",
    status: ExpanseStatusDto.PENDING,
  },
];
