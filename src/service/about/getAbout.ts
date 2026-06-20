import { axiosInstance } from "@/lib/axios";

export const getAbout = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/about");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching about data:",
      error.response || error.message || error
    );
    throw new Error("Failed to get about data");
  }
};
