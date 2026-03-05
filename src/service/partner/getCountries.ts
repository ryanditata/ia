import { axiosInstance } from "@/lib/axios";

export const getAgreements = async () => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/agreements");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching agreements:",
      error.response || error.message || error
    );
    throw new Error("Failed to get agreements");
  }
};

export const getCountries = async (): Promise<string[]> => {
  try {
    const data = await getAgreements();

    const countries = Object.keys(data).sort();

    return countries;
  } catch (error: any) {
    console.error(
      "Error fetching countries:",
      error.response || error.message || error
    );
    throw new Error("Failed to get countries");
  }
};