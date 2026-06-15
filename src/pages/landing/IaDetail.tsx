import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  CalendarRange,
  Building2,
  Inbox,
  SendHorizontal,
  FileText,
  Bookmark,
  AlertTriangle,
  MapPin,
  UserRound,
  FileSignature,
  Activity,
  Target,
  BarChart3,
  Landmark,
  GraduationCap,
  UsersRound,
  BadgeCheck,
} from "lucide-react";
import { getIaDetail } from "@/service/ia/getIaDetail";
import type { IaActivity, IaDetailResponse, IaImplementer, IaParticipant } from "@/types/ia";
import NotFound from "@/components/ui/NotFound";

export default function IaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [iaData, setIaData] = useState<IaDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getIaDetail(id);
        setIaData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <IaDetailSkeleton />;
  }

  if (!iaData?.data) {
    return (
      <NotFound
        title="IA Not Found"
        description="We couldn't find the Implementation Arrangement document you're looking for. It may have been removed or the ID is incorrect."
        buttonText="Go Back"
      />
    );
  }

  const ia = iaData.data;
  const isActive = String(ia.status || "").toLowerCase() === "active";
  const period = formatPeriod(ia.start_date, ia.end_date);
  const udiinusSide = ia.participants.find((p) => !isPartnerSide(p));
  const partnerSide = ia.participants.find((p) => isPartnerSide(p));
  const partnerName = partnerSide?.partner?.name || "Partner Institution";
  const partnerCategory = partnerSide?.partner?.category?.name || "-";

  const whatsappMessage = `Halo Admin LKUI, Saya ingin meminta izin untuk mengakses dokumen kerja sama berikut:

*Jenis Dokumen:* Implementation Arrangement (IA)
*Judul Dokumen:* ${ia.title || "-"}
*Nama Mitra:* ${partnerName}
*Keperluan:* [Mohon tuliskan alasan/keperluan Anda di sini...]

Terima kasih.`;
  const whatsappUrl = `https://wa.me/6281391002282?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-14 pt-24 dark:bg-slate-950">
      <div className="container mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="mb-4 cursor-pointer dark:text-slate-300">
          <ChevronLeft size={24} />
        </button>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            {/* HEADER */}
            <div className="relative px-6 pb-12 pt-10 sm:px-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(163,103,220,0.20)_2px,transparent_1px),linear-gradient(to_bottom,rgba(163,103,220,0.20)_2px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] dark:bg-[linear-gradient(to_left,rgba(168,85,247,0.20)_2px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.20)_2px,transparent_1px)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,103,220,0.20),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.20),transparent_40%)]" />

              <div className="relative z-10">
                <p className="text-base font-semibold uppercase tracking-[0.15em] text-[#a367dc] dark:text-purple-400">
                  Implementation Arrangement
                </p>
                <h1 className="mt-2 max-w-4xl text-2xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                  {ia.title}
                </h1>

                <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                  <Bookmark className="h-4 w-4 text-slate-800 dark:text-slate-500" />
                  <span className="font-medium tracking-wide">{ia.letter_number}</span>
                </p>

                {ia.description ? (
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                    {ia.description}
                  </p>
                ) : null}

                <div className="mt-4 grid grid-cols-1 items-center gap-5 md:mt-0 md:grid-cols-2">
                  <div className="justify-self-start">
                    {partnerSide?.partner ? (
                      <div className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200/50 bg-slate-50/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm md:text-sm dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-slate-200">
                        <Building2 size={16} className="text-slate-900 dark:text-slate-400" />
                        <span className="text-slate-900 dark:text-white">{partnerName}</span>
                        <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5" title={isActive ? "Active" : "Expired"}>
                          {isActive && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          )}
                          <span
                            className={`relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                              isActive ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          />
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="w-full justify-self-end sm:w-auto">
                    {ia.file_url ? (
                      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 transition-colors hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800/30 dark:hover:bg-slate-800/50">
                        <div className="flex flex-col items-start justify-between gap-2 p-2 sm:flex-row sm:items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 shadow-sm dark:bg-red-500/20 dark:text-red-400">
                              <FileText size={28} strokeWidth={1.5} />
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-slate-900 dark:text-white">IA Document</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">Request document access via WhatsApp.</p>
                            </div>
                          </div>
                          <div className="flex w-full gap-3 sm:w-auto">
                            <motion.a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80"
                            >
                              <SendHorizontal size={18} />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 px-6 py-8 text-center dark:border-amber-900/30 dark:bg-amber-950/20">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                          <AlertTriangle size={24} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Document Not Available</h4>
                          <p className="mt-1 text-xs text-amber-600 dark:text-amber-400/80">
                            No PDF file has been attached to this IA document yet.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 border-t border-slate-100 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50 md:grid-cols-3 sm:divide-x sm:divide-slate-100 sm:dark:divide-slate-800">
              <div className="p-6 sm:px-10 sm:py-8">
                <div className="mb-3">
                  <CalendarRange size={20} className="text-[#6771dc] dark:text-indigo-400" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Validity Period</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">{period}</p>
              </div>

              <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:border-t-0 sm:px-10 sm:py-8">
                <div className="mb-3">
                  <Building2 size={20} className="text-[#67b7dc] dark:text-sky-400" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Partner Category</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">{partnerCategory}</p>
              </div>

              <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:border-t-0 sm:px-10 sm:py-8">
                <div className="mb-3">
                  <Activity size={20} className="text-[#a367dc] dark:text-purple-400" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Activities</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">
                  {ia.activities?.length ? ia.activities.map((a) => formatLabel(a.name)).join(", ") : "-"}
                </p>
              </div>
            </div>

            {/* PARENT MOA */}
            {ia.moa ? (
              <div className="border-t border-slate-100 px-6 py-5 dark:border-slate-800 sm:px-10">
                <Link
                  to={`/moas/${ia.moa.id}`}
                  className="group flex w-full items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
                >
                  <FileSignature className="h-[18px] w-[18px] shrink-0 text-[#67b7dc] sm:h-5 sm:w-5 dark:text-sky-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Parent MoA</p>
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                      {ia.moa.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{ia.moa.letter_number}</p>
                  </div>
                </Link>
              </div>
            ) : null}

            {/* ACTIVITIES */}
            <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  <Activity size={22} className="text-[#a367dc] dark:text-purple-400" /> Cooperation Activities
                </h3>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {ia.activities?.length || 0}
                </span>
              </div>

              {ia.activities?.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                  className="grid grid-cols-1 gap-4"
                >
                  {ia.activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </motion.div>
              ) : (
                <EmptyState title="No activities listed" />
              )}
            </div>

            {/* SIGNATORIES */}
            <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  <UserRound size={22} className="text-[#6771dc] dark:text-indigo-400" /> Signatories
                </h3>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {ia.participants?.length || 0}
                </span>
              </div>

              {ia.participants?.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {udiinusSide ? (
                    <ParticipantCard participant={udiinusSide} role="Universitas Dian Nuswantoro" />
                  ) : null}
                  {partnerSide ? <ParticipantCard participant={partnerSide} role={partnerName} /> : null}
                </div>
              ) : (
                <EmptyState title="No data available" />
              )}
            </div>

            {/* IMPLEMENTERS */}
            <div className="border-t border-slate-100 bg-slate-50/30 p-6 dark:border-slate-800 dark:bg-slate-900/30 sm:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  <UsersRound size={22} className="text-[#a367dc] dark:text-purple-400" /> Implementers
                </h3>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {ia.implementers?.length || 0}
                </span>
              </div>

              {ia.implementers?.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                  className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
                >
                  {ia.implementers.map((implementer) => (
                    <ImplementerCard key={implementer.id} implementer={implementer} />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center dark:border-slate-700 dark:bg-slate-800/30">
                  <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    <Inbox className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No implementers listed</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function IaDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pb-14 pt-24 dark:bg-slate-950">
      <div className="container mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-8 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
          <div className="px-6 pb-12 pt-10 sm:px-10">
            <div className="h-4 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-64" />
            <div className="mt-3 h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-4/5" />
            <div className="mt-4 h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-8 grid grid-cols-1 items-center gap-5 md:grid-cols-2">
              <div className="h-10 w-48 justify-self-start animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-20 w-full justify-self-end animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800 sm:w-80" />
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-slate-100 dark:border-slate-800 md:grid-cols-3 sm:divide-x sm:divide-slate-100 sm:dark:divide-slate-800">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 sm:px-10 sm:py-8">
                <div className="mb-3 h-6 w-6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:p-10">
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-7 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-700">
                  <div className="mb-3 h-5 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:p-10">
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-7 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-700">
                  <div className="mb-4 h-6 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/30 p-6 dark:border-slate-800 dark:bg-slate-900/30 sm:p-10">
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-7 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: IaActivity }) {
  const { pivot } = activity;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
      className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-slate-700/80 dark:bg-slate-800/30"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#a367dc]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#a367dc] dark:bg-[#a367dc]/25 dark:text-purple-300">
        <Landmark size={14} />
        {formatLabel(activity.name)}
      </div>

      {activity.description ? (
        <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{activity.description}</p>
      ) : null}

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        {pivot.activity_target ? (
          <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Target</p>
              <p className="mt-0.5">{pivot.activity_target}</p>
            </div>
          </div>
        ) : null}
        {pivot.performance_indicator ? (
          <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
            <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Indicator</p>
              <p className="mt-0.5 capitalize">{pivot.performance_indicator}</p>
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function ParticipantCard({ participant, role }: { participant: IaParticipant; role: string }) {
  const studyPrograms = participant.studyprograms?.map((sp) => `${sp.name} (${sp.type})`).join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-slate-700/80 dark:bg-slate-800/30"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#6771dc]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6771dc] dark:bg-[#6771dc]/25 dark:text-indigo-300">
        <Building2 size={14} /> {role}
      </div>
      <div className="space-y-4 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Signatory</p>
          <p className="mt-1 font-semibold text-slate-900 dark:text-white">{participant.signatory_name || "-"}</p>
          <p className="text-slate-600 dark:text-slate-400">{participant.signatory_position || "-"}</p>
        </div>
        {studyPrograms ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Study Program</p>
            <p className="mt-1 inline-flex items-start gap-2 text-slate-600 dark:text-slate-300">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <span>{studyPrograms}</span>
            </p>
          </div>
        ) : null}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Address</p>
          <p className="mt-1 inline-flex items-start gap-2 text-slate-600 dark:text-slate-300">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="leading-relaxed">{participant.address || "-"}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ImplementerCard({ implementer }: { implementer: IaImplementer }) {
  const identifier = implementer.nip || implementer.nim;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
      className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a367dc]/10 text-[#a367dc] dark:bg-[#a367dc]/25 dark:text-purple-300">
          <BadgeCheck size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{formatName(implementer.name)}</p>
          <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {implementer.type}
          </span>
          {identifier ? (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {implementer.nip ? "NIP" : "NIM"}: {identifier}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-8 text-center dark:border-slate-700 dark:bg-slate-800/30">
      <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Inbox className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
    </div>
  );
}

function isPartnerSide(participant: IaParticipant) {
  return participant.side.toLowerCase() === "partner" || participant.partner_id !== null;
}

function formatLabel(value: string) {
  return value
    .split(/[_\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatName(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
