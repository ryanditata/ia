import { axiosInstance } from "@/lib/axios";

export const getContact = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/contact");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching contact data:",
      error.response || error.message || error
    );
    throw new Error("Failed to get contact data");
  }
};
