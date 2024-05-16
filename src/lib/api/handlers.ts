import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import type { Wallet } from "@/app/(main)/_data-layer/wallets/wallets";
import type { Transaction } from "@/db/schema";
import { apiConfig } from "@/lib/api/config";
import { cookies } from "next/headers";
import { expanseStatuses } from "../../__mocks__/expanses/expanse-statuses-mock";

/*
 * Expanses API
 */
export async function getTransactionsData(): Promise<Transaction[]> {
  const { data } = await fetcher(`${apiConfig.url}/api/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data;
}

export async function getExpanseData({
  id,
}: {
  id: string;
}): Promise<Expanse | undefined> {
  const { data } = await fetcher(`${apiConfig.url}/api/expanses/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data || !Array.isArray(data)) {
    return;
  }

  return {
    ...data[0],
    status: expanseStatuses
      .map((status) => ({
        label: status.label,
        value: status.value.toLowerCase(),
      }))
      .find((status) => status.value === data[0].status.toLowerCase())!,
    category: {
      value: data[0].category,
      label:
        data[0].category.split("")[0].toUpperCase() + data[0].category.slice(1),
    },
    issueDate: data[0].issue_date,
  };
}

// Wallets API
export async function getWalletsData(): Promise<Wallet[]> {
  console.log(cookies());

  const { data } = await fetcher(`${apiConfig.url}/api/wallets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data;
}

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: cookies().toString(),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      console.error(error);
      return { data: undefined };
    });
