import { axiosInstance } from "@/lib/axios";

export const getHome = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/home");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching home data:",
      error.response || error.message || error
    );
    throw new Error("Failed to get home data");
  }
};
