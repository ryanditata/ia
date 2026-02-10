import { useEffect, useState } from "react";
import { getPartners } from "@/service/partner/getPartner";

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
          <div className="overflow-x-auto rounded-lg border border-gray-400 shadow-md">
            <table className="w-full text-xs md:text-base lg:text-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-center">Partner Name</th>
                  <th className="px-4 py-2 text-center">City</th>
                  <th className="px-4 py-2 text-center">Province</th>
                  <th className="px-4 py-2 text-center">Country</th>
                </tr>
              </thead>
              <tbody>
                {partners.slice(0, 10).map((partner) => (
                  <tr key={partner.id}>
                    <td className="px-4 py-2 text-center">{partner.name}</td>
                    <td className="px-4 py-2 text-center">
                      {partner.city ?? ""}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {partner.province}
                    </td>
                    <td className="px-4 py-2 text-center">{partner.country}</td>
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
