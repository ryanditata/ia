import { axiosInstance } from "@/lib/axios";
import type { IaDetailResponse } from "@/types/ia";

export const getIaDetail = async (id: string | undefined): Promise<IaDetailResponse> => {
  if (!id) throw new Error("ID is required");

  try {
    const res = await axiosInstance.get(`https://lkui.dinus.id/api/v1/ias/${id}`);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching IA detail:", error);
    throw new Error("Failed to get IA detail");
  }
};
