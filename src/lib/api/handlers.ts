import {expanseStatuses} from "@/app/(main)/_data-layer/expanse-statuses-mock";
import type {Expanse, ExpanseDto} from "@/app/(main)/_data-layer/expanses";
import {apiConfig} from "@/lib/api/config";

export async function getExpansesData(): Promise<Expanse[]> {
  const {data} = await fetch(`${apiConfig.url}/api/expanses`, {
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
  }));
}
