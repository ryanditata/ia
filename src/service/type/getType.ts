import { axiosInstance } from "@/lib/axios";

export const getTypes = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/types");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching types data:",
      error.response || error.message || error
    );
    throw new Error("Failed to get types data");
  }
};
