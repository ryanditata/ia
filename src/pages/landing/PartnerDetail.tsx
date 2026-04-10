import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Building2,
  MapPin,
  Briefcase,
  Users,
  Link as LinkIcon,
  ScrollText,
  FileSignature,
  Landmark,
  CalendarRange,
  Hash,
  Circle,
  Inbox,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { getPartnerDetail } from "@/service/partner/getPartnerDetail";

export default function PartnerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Partner Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary-600 hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-14 pt-8 dark:bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
        >
          <ChevronLeft size={18} />
          Back to Partners
        </button>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-6 pb-16 pt-10 sm:px-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_55%)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-100/80">International Partnership Profile</p>
                <h1 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-4xl">{partner.name}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
                  {partner.description !== "-" ? partner.description : "No description available for this institution."}
                </p>
              </div>
            </div>

            <div className="px-6 pb-8 sm:px-10">
              <div className="-mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-end gap-5">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xl ring-4 ring-white dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-900 sm:h-32 sm:w-32">
                    {partner.logo_url ? (
                      <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <Building2 className="h-12 w-12 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <Tag icon={<Briefcase size={14} />} label="Category" value={partner.category || "-"} />
                    <Tag
                      icon={<LinkIcon size={14} />}
                      label="Level"
                      value={partner.level ? String(partner.level).toUpperCase() : "-"}
                    />
                    <Tag
                      icon={<MapPin size={14} />}
                      label="Country"
                      value={`${partner.city && partner.city !== "-" ? `${partner.city}, ` : ""}${partner.country || "-"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <Section title="Memorandum of Understanding (MoU)" icon={<ScrollText size={18} className="text-blue-600 dark:text-blue-400" />} count={partner.mous?.length}>
                <DocumentList docs={partner.mous} type="MoU" />
              </Section>

              <Section title="Memorandum of Agreement (MoA)" icon={<FileSignature size={18} className="text-emerald-600 dark:text-emerald-400" />} count={partner.moas?.length}>
                <DocumentList docs={partner.moas} type="MoA" />
              </Section>

              <Section title="Implementation Arrangement (IA)" icon={<Landmark size={18} className="text-amber-600 dark:text-amber-400" />} count={partner.ias?.length}>
                <DocumentList docs={partner.ias} type="IA" />
              </Section>
            </div>

            <div className="space-y-8">
              <Section title="Contact Persons" icon={<Users size={18} className="text-indigo-600 dark:text-indigo-400" />} count={partner.contacts?.length}>
                {partner.contacts?.length > 0 ? (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.08 } },
                    }}
                    className="space-y-3"
                  >
                    {partner.contacts.map((contact: any) => (
                      <ContactCard key={contact.id} contact={contact} />
                    ))}
                  </motion.div>
                ) : (
                  <EmptyState title="No contacts listed" subtitle="Contact persons for this partnership have not been added yet." />
                )}
              </Section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ title, icon, count, children }: { title: string, icon: React.ReactNode, count: number, children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {icon} {title}
        </h3>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {count || 0}
        </span>
      </div>
      <div>{count > 0 ? children : <EmptyState title="No data available" subtitle="There are no records in this section yet." />}</div>
    </div>
  );
}

function Tag({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
      <span className="text-slate-500 dark:text-slate-400">{icon}</span>
      <span className="text-slate-500 dark:text-slate-400">{label}:</span>
      <span className="text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}

function DocumentList({ docs, type }: { docs: any[], type: string }) {
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

function DocumentCard({ doc, type }: { doc: any, type: string }) {
  const isActive = String(doc.status || "").toLowerCase() === "active";
  const period = useMemo(() => formatPeriod(doc.start_date, doc.end_date), [doc.start_date, doc.end_date]);

  const typeConfig = {
    MoU: {
      icon: <ScrollText size={16} className="text-blue-600 dark:text-blue-400" />,
      chip: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    MoA: {
      icon: <FileSignature size={16} className="text-emerald-600 dark:text-emerald-400" />,
      chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    IA: {
      icon: <Landmark size={16} className="text-amber-600 dark:text-amber-400" />,
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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.chip}`}>
            {config.icon}
            {type}
          </div>
          <h4 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">{doc.title || "Untitled document"}</h4>
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
          <Hash className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span>No. {doc.letter_number || "-"}</span>
        </p>
        <p className="inline-flex items-center gap-2">
          <CalendarRange className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span>{period}</span>
        </p>
      </div>
    </motion.div>
  );
}

function ContactCard({ contact }: { contact: any }) {
  const initials = (contact.name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word: string) => word[0]?.toUpperCase() || "")
    .join("");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-800/40 dark:hover:bg-slate-800/70"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-blue-900 text-sm font-semibold text-white dark:from-slate-500 dark:to-slate-700">
          {initials || <UserRound size={16} />}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-white">{contact.name || "Unnamed Contact"}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{contact.position || "No position provided"}</p>
          <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <p className="inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <span className="truncate">{contact.email || "-"}</span>
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-slate-400" />
              <span>{contact.phone || "-"}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ title, subtitle }: { title: string, subtitle: string }) {
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