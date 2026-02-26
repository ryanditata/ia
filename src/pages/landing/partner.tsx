import { useEffect, useState } from "react";
import { getPartners } from "@/service/partner/getPartner";
import { BadgeCheck } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  city: string;
  province: string;
  country: string;
}

export default function Partner() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getPartners();
        setPartners(data); // pastikan API return array partner
      } catch (error) {
        console.error("Failed to fetch partners", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const toTitleCase = (text?: string) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="container bg-white py-12 lg:space-y-16" id="partners">
      <div className="space-y-8 text-center">
        <h2 className="text-xl font-bold lg:text-3xl">
          List of Collaboration Partners
        </h2>
        <p className="text-sm text-neutral-700 lg:text-lg">
          We collaborate with various institutions around the world to expand
          academic networks and enhance the quality of education.
        </p>

        {loading ? (
          <p>Loading partners...</p>
        ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-primary-600 text-white">
                <th className="px-6 py-6 text-start font-semibold">No</th>
                <th className="px-6 py-4 text-start font-semibold first:rounded-tl-xl">Partner Name</th>
                <th className="px-6 py-4 text-start font-semibold">City</th>
                <th className="px-6 py-4 text-start font-semibold">Province</th>
                <th className="px-6 py-4 text-start font-semibold last:rounded-tr-xl">Country</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm">
              {partners.slice(0, 10).map((partner, index) => (
                <tr key={partner.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-5 align-middle">
                    <div className="flex items-center justify-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#eef6ff] text-primary-600 font-medium md:text-base">
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-start align-middle">
                    <div className="flex items-center">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#eef6ff] text-primary-600 rounded-full md:text-base font-medium border border-[#d0e4ff] shadow-sm transition-transform group-hover:scale-[1.02]">
                        <BadgeCheck size={14} strokeWidth={3} className="text-primary-600 " />
                        <span className="tracking-wide">
                          {toTitleCase(partner.name)}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-start text-black md:text-base font-medium">
                    {toTitleCase(partner.city)}
                  </td>
                  <td className="px-6 py-5 text-start text-black md:text-base font-medium">
                    {toTitleCase(partner.province)}
                  </td>
                  <td className="px-6 py-5 text-start text-black md:text-base font-medium">
                    {toTitleCase(partner.country)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
