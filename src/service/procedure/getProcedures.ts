import { axiosInstance } from "@/lib/axios";

export const getProcedures = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/procedures");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching procedures data:",
      error.response || error.message || error
    );
    throw new Error("Failed to get procedures data");
  }
};
