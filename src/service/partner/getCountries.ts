import { axiosInstance } from "@/lib/axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCountries = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get(
      "https://lkui.dinus.id/api/v1/agreements"
    );
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error fetching partners:",
      error.response || error.message || error
    );
    throw new Error("Failed to get partners");
  }
};
