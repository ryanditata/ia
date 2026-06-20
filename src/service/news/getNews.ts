import { axiosInstance } from "@/lib/axios";

export const getNews = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/news");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching news data:",
      error.response || error.message || error
    );
    throw new Error("Failed to get news data");
  }
};
