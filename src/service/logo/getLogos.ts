import { axiosInstance } from "@/lib/axios";

export const getLogos = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/logos");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching logos data:",
      error.response || error.message || error
    );
    throw new Error("Failed to get logos data");
  }
};
