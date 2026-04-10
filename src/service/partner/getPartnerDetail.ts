import { axiosInstance } from "@/lib/axios";

export const getPartnerDetail = async (id: string | undefined): Promise<any> => {
  if (!id) throw new Error("ID is required");
  
  try {
    const res = await axiosInstance.get(`https://lkui.dinus.id/api/v1/partners/${id}`);
    return res.data.data;
  } catch (error: any) {
    console.error("Error fetching partner detail:", error.response || error.message || error);
    throw new Error("Failed to get partner detail");
  }
};