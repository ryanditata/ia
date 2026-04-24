import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Building2,
  MapPin,
  Bookmark,
  ScrollText,
  FileSignature,
  Landmark,
  CalendarRange,
  Circle,
  Inbox,
  Ribbon,
  SearchX
} from "lucide-react";
import { getPartnerDetail } from "@/service/partner/getPartnerDetail";

export default function PartnerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); 

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getPartnerDetail(id);
        setPartner(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getPartnerDetail(id);
        setPartner(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return <PartnerDetailSkeleton />;
  }

  if (!partner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex max-w-md flex-col items-center text-center"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 animate-pulse rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-900/20" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <SearchX className="h-10 w-10 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
            </div>
          </motion.div>

          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Partner Not Found
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            We couldn't find the partnership data you're looking for. The document might have been removed or the ID is incorrect.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <ChevronLeft size={18} />
            Return to Partners List
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-14 pt-24 dark:bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 cursor-pointer dark:text-slate-300"
        >
          <ChevronLeft size={24} />
        </button>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="relative px-6 pb-16 pt-10 sm:px-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_left,#e2e8f0_2px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_2px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] dark:bg-[linear-gradient(to_left,#334155_2px,transparent_1px),linear-gradient(to_bottom,#334155_2px,transparent_1px)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="relative z-10">
                <p className="text-lg font-semibold uppercase tracking-[0.15em] text-blue-700 dark:text-blue-400">
                  International Partnership Profile
                </p>
                <h1 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
                  {partner.name}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                  {partner.description !== "-" ? partner.description : "No description available for this institution."}
                </p>
              </div>
            </div>

            <div className="-mt-10 px-6 pb-8 sm:px-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-end gap-5">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-3 ring-4 ring-white dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-900 sm:h-32 sm:w-32">
                    {partner.logo_url ? (
                      <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <Building2 className="h-14 w-14 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <Tag
                      icon={<Building2 size={14} />}
                      value={partner.category || "-"}
                    />
                    <Tag
                      icon={<Ribbon size={14} />}
                      value={partner.level ? String(partner.level).toUpperCase() : "-"}
                    />
                    <Tag
                      icon={<MapPin size={14} />}
                      value={`${partner.city && partner.city !== "-" ? `${partner.city}, ` : ""}${partner.country || "-"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Section
              title="Memorandum of Understanding"
              icon={<ScrollText size={24} className="text-blue-700 dark:text-blue-400" />}
              count={partner.mous?.length}
            >
              <DocumentList docs={partner.mous} type="MoU" />
            </Section>

            <Section
              title="Memorandum of Agreement"
              icon={<FileSignature size={24} className="text-emerald-700 dark:text-emerald-400" />}
              count={partner.moas?.length}
            >
              <DocumentList docs={partner.moas} type="MoA" />
            </Section>

            <Section
              title="Implementation Arrangement"
              icon={<Landmark size={24} className="text-amber-700 dark:text-amber-400" />}
              count={partner.ias?.length}
            >
              <DocumentList docs={partner.ias} type="IA" />
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PartnerDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pb-14 pt-8 dark:bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-6 h-8 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-8">
          {/* Header Card Skeleton */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="px-6 pb-16 pt-10 sm:px-10">
              <div className="h-5 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-1/2" />
              <div className="mt-5 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800 lg:w-2/3" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800 lg:w-1/2" />
              </div>
            </div>
            <div className="-mt-10 px-6 pb-8 sm:px-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
                <div className="h-28 w-28 shrink-0 animate-pulse rounded-2xl border-4 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-800 sm:h-32 sm:w-32" />
                <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3 lg:w-auto">
                  <div className="h-10 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800 sm:w-32" />
                  <div className="h-10 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800 sm:w-32" />
                  <div className="h-10 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800 sm:w-40" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {[1, 2, 3].map((sectionIndex) => (
              <div key={sectionIndex} className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-64" />
                  </div>
                  <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="space-y-4">
                  {[1, 2].map((cardIndex) => (
                    <div key={cardIndex} className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-700">
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div className="w-3/4 space-y-3">
                          <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                          <div className="h-5 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-5/6" />
                        </div>
                        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  count,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {icon} {title}
        </h3>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {count || 0}
        </span>
      </div>
      <div>
        {count > 0 ? (
          children
        ) : (
          <EmptyState title="No data available" subtitle="There are no records in this section yet." />
        )}
      </div>
    </div>
  );
}

function Tag({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-50/90 px-3 py-2 text-xs md:text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
      <span className="text-slate-900 dark:text-slate-400">{icon}</span>
      <span className="text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}

function DocumentList({ docs, type }: { docs: any[]; type: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="space-y-4"
    >
      {docs?.map((doc: any) => (
        <DocumentCard key={doc.id} doc={doc} type={type} />
      ))}
    </motion.div>
  );
}

function DocumentCard({ doc, type }: { doc: any; type: string }) {
  const isActive = String(doc.status || "").toLowerCase() === "active";
  const period = useMemo(() => formatPeriod(doc.start_date, doc.end_date), [doc.start_date, doc.end_date]);

  const typeConfig = {
    MoU: {
      icon: <ScrollText size={16} className="text-blue-700 dark:text-blue-400" />,
      chip: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    MoA: {
      icon: <FileSignature size={16} className="text-emerald-700 dark:text-emerald-400" />,
      chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    IA: {
      icon: <Landmark size={16} className="text-amber-700 dark:text-amber-400" />,
      chip: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    },
  } as const;

  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.MoU;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0 },
      }}
      className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900 cursor-pointer"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.chip}`}>
            {config.icon}
            {type}
          </div>
          <h4 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
            {doc.title || "Untitled document"}
          </h4>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isActive
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
              : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
          }`}
        >
          <Circle className="h-2 w-2 fill-current stroke-0" />
          {isActive ? "Active" : "Expired"}
        </span>
      </div>

      <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
        <p className="inline-flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-slate-800 dark:text-slate-500" />
          <span>No. {doc.letter_number || "-"}</span>
        </p>
        <p className="inline-flex items-center gap-2">
          <CalendarRange className="h-4 w-4 text-slate-800 dark:text-slate-500" />
          <span>{period}</span>
        </p>
      </div>
    </motion.div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-8 text-center dark:border-slate-700 dark:bg-slate-800/30">
      <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Inbox className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  );
}

function formatPeriod(startDate?: string, endDate?: string) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (!start && !end) return "-";
  if (!start) return `Until ${end}`;
  if (!end) return `From ${start}`;
  return `${start} - ${end}`;
}

function formatDate(value?: string) {
  if (!value || value === "-") return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}