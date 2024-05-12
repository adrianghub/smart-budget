import { expanseStatuses } from "@/app/(main)/_data-layer/expanse/expanse-statuses-mock";
import type {
  Expanse,
  ExpanseDto,
} from "@/app/(main)/_data-layer/expanse/expanses";
import { apiConfig } from "@/lib/api/config";

export async function getExpansesData(): Promise<Expanse[]> {
  const { data } = await fetch(`${apiConfig.url}/api/expanses`, {
    // cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((exp: ExpanseDto) => ({
    ...exp,
    status: expanseStatuses
      .map((status) => ({
        label: status.label,
        value: status.value.toLowerCase(),
      }))
      .find((status) => status.value === exp.status.toLowerCase())!,
    category: {
      value: exp.category,
      label: exp.category.split("")[0].toUpperCase() + exp.category.slice(1),
    },
    issueDate: new Date(exp.issue_date).toLocaleDateString("pl-PL"),
    fvRefUrl: exp.fv_ref_url,
  }));
}

export async function getExpanseData({
  id,
}: {
  id: string;
}): Promise<Expanse | undefined> {
  const { data } = await fetch(`${apiConfig.url}/api/expanses/${id}`, {
    // cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      return;
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
