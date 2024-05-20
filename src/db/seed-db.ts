import { db } from "@/db/drizzle";
import { categories, statuses, transactions, wallets } from "@/db/schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config();

async function seedData() {
  // Delete previous data
  try {
    await db.delete(transactions);
    await db.delete(wallets);
    await db.delete(categories);
    await db.delete(statuses);
    console.log("Previous data deleted successfully.");
  } catch (error) {
    console.error("Error deleting previous data:", error);
    return;
  }

  // Seed statuses
  const statusRecords = [
    { id: faker.datatype.uuid(), name: "Pending" },
    { id: faker.datatype.uuid(), name: "Completed" },
    { id: faker.datatype.uuid(), name: "Failed" },
  ];

  try {
    await db.insert(statuses).values(statusRecords);
  } catch (error) {
    console.error("Error seeding statuses:", error);
    return;
  }

  // Seed wallets
  const walletRecords = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    name: faker.finance.accountName(),
    userId: faker.string.uuid(),
    plaidId: faker.string.uuid(),
  }));
  try {
    await db.insert(wallets).values(walletRecords);
  } catch (error) {
    console.error("Error seeding wallets:", error);
    return;
  }

  // Seed categories
  const categoryRecords = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    userId: faker.string.uuid(),
    plaidId: faker.string.uuid(),
  }));
  try {
    await db.insert(categories).values(categoryRecords);
  } catch (error) {
    console.error("Error seeding categories:", error);
    return;
  }

  // Seed transactions
  const transactionRecords = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    amount: faker.number.int({ min: 10, max: 1000 }),
    payee: faker.company.name(),
    notes: faker.lorem.sentence(),
    issue_date: faker.date.past(),
    fv_ref_url: faker.internet.url(),
    walletId: faker.helpers.arrayElement(walletRecords).id,
    categoryId: faker.helpers.arrayElement(categoryRecords).id,
    statusId: faker.helpers.arrayElement(statusRecords).id,
    file: faker.system.filePath(),
  }));
  try {
    await db.insert(transactions).values(transactionRecords);
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return;
  }

  console.log("Data seeded successfully.");
}
