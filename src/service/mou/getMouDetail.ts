import { axiosInstance } from "@/lib/axios";
import type { MouDetailResponse } from "@/types/mou";

export const getMouDetail = async (id: string | undefined): Promise<MouDetailResponse> => {
  if (!id) throw new Error("ID is required");

  try {
    const res = await axiosInstance.get(`https://lkui.dinus.id/api/v1/mous/${id}`);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching MoU detail:", error);
    throw new Error("Failed to get MoU detail");
  }
};
