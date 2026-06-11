import { axiosInstance } from "@/lib/axios";
import type { MoaDetailResponse } from "@/types/moa";

export const getMoaDetail = async (id: string | undefined): Promise<MoaDetailResponse> => {
  if (!id) throw new Error("ID is required");

  try {
    const res = await axiosInstance.get(`https://lkui.dinus.id/api/v1/moas/${id}`);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching MoA detail:", error);
    throw new Error("Failed to get MoA detail");
  }
};
