import { axiosInstance } from "@/lib/axios";

export const getPartners = async (
  page = 1,
  search = "",
  country = "",
  city = "",
  category = ""
): Promise<any> => {
  try {
    const res = await axiosInstance.get(
      "https://lkui.dinus.id/api/v1/partners",
      {
        params: {
          page,
          search,
          country,
          city,
          category,
          per_page: 10,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching partners:",
      error.response || error.message || error
    );
    throw new Error("Failed to get partners");
  }
};

export const getPartnerHeader = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("https://lkui.dinus.id/api/v1/partner");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching partner header:",
      error.response || error.message || error
    );
    throw new Error("Failed to get partner header");
  }
};