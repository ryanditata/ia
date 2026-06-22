import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Bookmark, Building2, MapPin, ScrollText, FileSignature, Landmark, ListFilter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPartners, getPartnerHeader } from "@/service/partner/getPartner";
import { getCountries, getCities, getCategories } from "@/service/partner/getFilter";

interface Partner {
  id: number;
  logo_url?: string;
  name: string;
  city: string;
  province: string;
  country: string;
  category: string;
  mous_count?: number;
  moas_count?: number;
  ias_count?: number;
}

interface CategoryOption {
  id: number;
  name: string;
}

function Tag({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/60 bg-slate-50/50 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/50">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </span>
      <span className="text-sm font-bold text-slate-900 dark:text-slate-200">
        {value}
      </span>
    </div>
  );
}

export default function Partner() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [headerData, setHeaderData] = useState<{ title: string; description: string } | null>(null);
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [countries, setCountries] = useState<string[]>([]);
  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const res = await getPartners(currentPage, search, countryFilter, cityFilter, categoryFilter);
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
  }, [currentPage, search, countryFilter, cityFilter, categoryFilter]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [resCountries, resCities, resCategories, headerRes] = await Promise.all([
          getCountries(),
          getCities(),
          getCategories(),
          getPartnerHeader()
        ]);
        setCountries(resCountries);
        setCities(resCities);
        setCategories(resCategories);
        if (headerRes?.success && headerRes?.data) {
          setHeaderData(headerRes.data);
        }
      } catch (error) {
        console.error("Failed to load initial partner data", error);
      } finally {
        setIsHeaderLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleMapCountryClick = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const clickedCountry = customEvent.detail;
      const matchedCountry = countries.find(
        (c) => c.toLowerCase() === clickedCountry.toLowerCase()
      );
      
      if (matchedCountry) {
        setCountryFilter(matchedCountry);
      } else {
        const partialMatch = countries.find(
          (c) => c.toLowerCase().includes(clickedCountry.toLowerCase()) || clickedCountry.toLowerCase().includes(c.toLowerCase())
        );
        if (partialMatch) {
          setCountryFilter(partialMatch);
        } else {
          setCountryFilter(clickedCountry.toLowerCase());
        }
      }
      setCurrentPage(1);
    };

    window.addEventListener("map-country-clicked", handleMapCountryClick);
    return () => {
      window.removeEventListener("map-country-clicked", handleMapCountryClick);
    };
  }, [countries]);

  const toTitleCase = (text?: string) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div
      id="partners"
      className="relative min-h-screen overflow-hidden bg-slate-50 py-20 dark:bg-slate-950"
    >
      <div className="container mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          key={isHeaderLoading ? "loading" : "loaded"}
          initial={{ opacity: 0, y: 20 }}
          whileInView={!isHeaderLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Section Header */}
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              {headerData?.title}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
              {headerData?.description}
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col gap-0 rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
              <div className="relative w-full md:max-w-md">
                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 dark:text-slate-400"
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
                />
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-300 md:w-auto ${
                  isFilterOpen 
                    ? "border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-500/50 dark:bg-primary-500/10 dark:text-primary-400" 
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50"
                }`}
              >
                <ListFilter size={18} />
                <span>Filter</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-slate-100 dark:border-slate-800/50"
                >
                  <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Country</label>
                      <div className="relative">
                        <select
                          value={countryFilter}
                          onChange={(e) => {
                            setCountryFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                        >
                          <option value="">All Country</option>
                          {countries.map((c) => (
                            <option key={c} value={c}>{toTitleCase(c)}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">City</label>
                      <div className="relative">
                        <select
                          value={cityFilter}
                          onChange={(e) => {
                            setCityFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                        >
                          <option value="">All City</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>{toTitleCase(city)}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Category</label>
                      <div className="relative">
                        <select
                          value={categoryFilter}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                        >
                          <option value="">All Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cards List */}
          <div className="space-y-6">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-900 sm:flex-row">
                  <div className="flex w-full flex-col gap-6 p-4 sm:flex-row sm:items-center md:p-6">
                    <div className="h-28 w-28 shrink-0 animate-pulse rounded-2xl border border-slate-200/80 bg-slate-200 ring-4 ring-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:ring-slate-900/50 md:h-36 md:w-36"></div>
                    <div className="flex w-full flex-col justify-center gap-3">
                      <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-2/3"></div>
                      <div className="mb-1 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-1/2"></div>
                      <div className="grid max-w-xl grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
                        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {partners.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    No partners found.
                  </div>
                ) : (
                  partners.map((partner) => (
                    <motion.div
                      key={partner.id}
                      onClick={() => navigate(`/partners/${partner.id}`)}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition-all hover:border-primary-500/30 dark:border-slate-800 dark:bg-slate-900 sm:flex-row"
                    >
                      {/* Background Grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_left,#e2e8f0_2px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_2px,transparent_1px)] bg-[size:50px_50px] opacity-60 transition-opacity duration-300 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] group-hover:opacity-100 dark:bg-[linear-gradient(to_left,#334155_2px,transparent_1px),linear-gradient(to_bottom,#334155_2px,transparent_1px)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />

                      <div className="relative z-10 flex w-full flex-col gap-6 p-4 md:p-6 sm:flex-row sm:items-center">
                        <div className="flex shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-3 ring-4 ring-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-900/50 h-30 w-30 md:h-36 md:w-36">
                          {partner.logo_url ? (
                            <img
                              src={partner.logo_url}
                              alt={partner.name}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <Building2 className="h-8 w-8 md:h-12 md:w-12 text-slate-300 dark:text-slate-600" />
                          )}
                        </div>

                        <div className="flex w-full flex-col justify-center gap-3">
                          <h3 className="flex items-start gap-2 text-lg md:text-xl font-semibold uppercase leading-tight text-slate-900 dark:text-white md:text-2xl">
                            {partner.name}
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary-600 fill-primary-100 dark:fill-primary-900/50"/>
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1.5 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              <Bookmark className="h-4 w-4"></Bookmark>
                              {partner.category ? toTitleCase(partner.category) : "-"}
                            </span>
                            <span className="flex items-center gap-1.5 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              <MapPin className="h-4 w-4" /> 
                              {partner.city && partner.city !== "-" ? `${toTitleCase(partner.city)}, ` : ""}
                              {partner.country ? toTitleCase(partner.country) : "-"}
                            </span>
                          </div>

                          {/* Badges */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-xl">
                            <Tag
                              icon={<ScrollText size={14} className="text-[#6771dc] dark:text-indigo-400" />}
                              label="MOU"
                              value={partner.mous_count || 0}
                            />
                            <Tag
                              icon={<FileSignature size={14} className="text-[#67b7dc] dark:text-sky-400" />}
                              label="MOA"
                              value={partner.moas_count || 0}
                            />
                            <Tag
                              icon={<Landmark size={14} className="text-[#a367dc] dark:text-purple-400" />}
                              label="IA"
                              value={partner.ias_count || 0}
                            />
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="hidden text-sm text-slate-600 dark:text-slate-400 sm:block">
                Showing <span className="font-medium text-slate-900 dark:text-slate-200">{(currentPage - 1) * 10 + 1}</span> to{" "}
                <span className="font-medium text-slate-900 dark:text-slate-200">{Math.min(currentPage * 10, totalData)}</span> of{" "}
                <span className="font-medium text-slate-900 dark:text-slate-200">{totalData}</span> partners
              </p>
              <div className="flex flex-1 items-center justify-between gap-3 sm:justify-end">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}