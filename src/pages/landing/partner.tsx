import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, BadgeCheck, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPartners } from "@/service/partner/getPartner";
import { getCountries } from "@/service/partner/getCountries";
import { TableRowSkeleton } from "@/components/ui/Skeleton";

interface Partner {
  id: number;
  name: string;
  city: string;
  province: string;
  country: string;
}

export default function Partner() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);

        const res = await getPartners(currentPage, search, countryFilter);

        setPartners(res.data);
        setTotalPages(res.last_page);
        setTotalData(res.total);

      } catch (error) {
        console.error("Failed to fetch partners", error);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [currentPage, search, countryFilter]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await getCountries();
      setCountries(res);
    };

    fetchCountries();
  }, []);

  const toTitleCase = (text?: string) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div
      id="partners"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              List of Collaboration Partners
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
              We collaborate with various institutions worldwide to expand
              academic networks and enhance the quality of education.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                strokeWidth={2}
              />
              <input
                type="text"
                placeholder="Search partners..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative w-full md:w-56">
                <select
                  id="country-filter"
                  value={countryFilter}
                  onChange={(e) => {
                    setCountryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white cursor-pointer"
                >
                  <option value="">All Countries</option>

                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {toTitleCase(c)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50">
            {loading ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80">
                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      No
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Partner Name
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      City
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Province
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Country
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, i) => (
                    <TableRowSkeleton key={i} />
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80">
                        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          No
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          Partner Name
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          City
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          Province
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          Country
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      <AnimatePresence mode="popLayout">
                        {partners.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-6 py-16 text-center text-slate-500 dark:text-slate-400"
                            >
                              No partners found.
                            </td>
                          </tr>
                        ) : (
                          partners.map((partner, index) => (
                            <motion.tr
                              key={partner.id}
                              onClick={() => navigate(`/partners/${partner.id}`)}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="cursor-pointer transition-colors duration-300 ease-in-out hover:bg-primary-50/50 dark:hover:bg-slate-800/50"
                            >
                              <td className="px-6 py-5">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                                  {(currentPage - 1) * 10 + index + 1}
                                </span>
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/80 bg-primary-50/80 px-4 py-2 text-sm font-medium text-primary-700 shadow-sm transition-all duration-300 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                                    <BadgeCheck size={16} strokeWidth={2.5} />
                                    {toTitleCase(partner.name)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-5 text-sm font-medium text-slate-700 dark:text-slate-300">
                                {toTitleCase(partner.city)}
                              </td>
                              <td className="px-6 py-5 text-sm font-medium text-slate-700 dark:text-slate-300">
                                {toTitleCase(partner.province)}
                              </td>
                              <td className="px-6 py-5">
                                <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                  {toTitleCase(partner.country)}
                                </span>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Showing{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * 10 + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          currentPage * 10,
                          totalData
                        )}
                      </span>{" "}
                      of <span className="font-medium">{totalData}</span>{" "}
                      partners
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <span className="px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
