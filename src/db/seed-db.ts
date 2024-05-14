import { createClient } from "@/lib/supabase/server";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config();

const supabase = createClient();

async function seedData() {
  const deleteResponse = await supabase.from("expenses").delete().select("*");

  if (deleteResponse.error) {
    console.error("Error deleting previous data:", deleteResponse.error);
    return;
  }

  console.log("Previous data deleted successfully.");

  const records = [];

  for (let i = 0; i < 20; i++) {
    records.push({
      title: faker.commerce.productName(),
      user_id: "b2310f2e-5e84-488b-a3f2-512c499857d7",
      amount: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      issue_date: faker.date.recent({ days: 1 }).toISOString().split("T")[0],
      fv_ref_url: faker.internet.url(),
      status: faker.helpers.arrayElement(["PAID", "UNPAID", "PENDING"]),
    });
  }

  const { data, error } = await supabase.from("expenses").insert(records);

  if (error) {
    console.error("Error seeding data:", error);
    return;
  }

  console.log("Data seeded successfully:", data);
}

seedData();
