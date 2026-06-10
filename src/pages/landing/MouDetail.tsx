import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, FileSignature, CalendarRange, Building2, Target, Circle, Inbox, SendHorizontal, FileText, Bookmark, AlertTriangle, MapPin, UserRound } from "lucide-react";
import { getMouDetail } from "@/service/mou/getMouDetail";
import type { MouDetailResponse, MouParticipant, RelatedMoa } from "@/types/mou";
import NotFound from "@/components/ui/NotFound";

export default function MouDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mouData, setMouData] = useState<MouDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getMouDetail(id);
        setMouData(data);
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
      <div className="min-h-screen bg-slate-50 pb-14 pt-24 dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 h-8 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="px-6 pb-12 pt-10 sm:px-10">
              <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-56" />
              <div className="mt-3 h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-4/5" />
              <div className="mt-4 h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-5 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
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
              <div className="grid grid-cols-1 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 pt-12 dark:border-slate-700 dark:bg-slate-900">
                    <div className="absolute left-0 top-0 h-7 w-20 animate-pulse rounded-br-lg bg-slate-200 dark:bg-slate-800" />
                    <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="space-y-2">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (!mouData?.data) {
    return (
      <NotFound 
        title="MoU Not Found"
        description="We couldn't find the MoU document you're looking for. It may have been removed or the ID is incorrect."
        buttonText="Go Back"
      />
    );
  }

  const mou = mouData.data;
  const relatedMoas = mouData.related_moas?.data ?? [];
  const isActive = String(mou.status || "").toLowerCase() === "active";
  const period = formatPeriod(mou.start_date, mou.end_date);
  const udiinusSide = mou.participants.find((p) => !isPartnerSide(p));
  const partnerSide = mou.participants.find((p) => isPartnerSide(p));

  const whatsappMessage = `Halo Admin LKUI, Saya ingin meminta izin untuk mengakses dokumen kerja sama berikut:

*Jenis Dokumen:* Memorandum of Understanding (MoU)
*Judul Dokumen:* ${mou.title || "-"}
*Nama Mitra:* ${mou.partner?.name || "-"}
*Keperluan:* [Mohon tuliskan alasan/keperluan Anda di sini...]

Terima kasih.`;
  const whatsappUrl = `https://wa.me/6281391002282?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-14 pt-24 dark:bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="mb-4 cursor-pointer dark:text-slate-300">
          <ChevronLeft size={24} />
        </button>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            
            {/* HEADER SECTION */}
            <div className="relative px-6 pb-12 pt-10 sm:px-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_left,#e2e8f0_2px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_2px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] dark:bg-[linear-gradient(to_left,#334155_2px,transparent_1px),linear-gradient(to_bottom,#334155_2px,transparent_1px)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
              
              <div className="relative z-10">
                <p className="text-base font-semibold uppercase tracking-[0.15em] text-primary-600 dark:text-primary-400">
                  Memorandum of Understanding
                </p>
                <h1 className="mt-2 max-w-4xl text-2xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                  {mou.title}
                </h1>
                
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                  <Bookmark className="h-4 w-4 text-slate-800 dark:text-slate-500" />
                  <span className="font-medium tracking-wide">{mou.letter_number}</span>
                </p>
                
                {mou.description && mou.description !== "-" ? (
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                    {mou.description}
                  </p>
                ) : null}

                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 mt-4 md:mt-0">
                  <div className="justify-self-start">
                    {mou.partner ? (
                      <div className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200/50 bg-slate-50/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm md:text-sm dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-slate-200">
                        <Building2 size={16} className="text-slate-900 dark:text-slate-400" />
                        <span className="text-slate-900 dark:text-white">{mou.partner.name}</span>
                        <span
                          className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5"
                          title={isActive ? "Active" : "Expired"}
                        >
                          {isActive && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          )}
                          <span
                            className={`relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                              isActive ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          ></span>
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="w-full justify-self-end sm:w-auto">
                    {mou.file_url ? (
                      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 transition-colors hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800/30 dark:hover:bg-slate-800/50">
                        <div className="flex flex-col items-start justify-between gap-2 p-2 sm:flex-row sm:items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 shadow-sm dark:bg-red-500/20 dark:text-red-400">
                              <FileText size={28} strokeWidth={1.5} />
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                                MoU Document
                              </h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Request document access via WhatsApp.
                              </p>
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
                          <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                            Document Not Available
                          </h4>
                          <p className="mt-1 text-xs text-amber-600 dark:text-amber-400/80">
                            No PDF file has been attached to this MoU document yet.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* INFO GRID  */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-100 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50 sm:divide-x sm:divide-slate-100 sm:dark:divide-slate-800">
              <div className="p-6 sm:px-10 sm:py-8">
                <div className="mb-3"><CalendarRange size={20} className="text-[#6771dc] dark:text-indigo-400" /></div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Validity Period</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">{period}</p>
              </div>
              
              <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:border-t-0 sm:px-10 sm:py-8">
                <div className="mb-3"><Building2 size={20} className="text-[#67b7dc] dark:text-sky-400" /></div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Partner Category</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">{mou.partner?.category || "-"}</p>
              </div>
              
              <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:border-t-0 sm:px-10 sm:py-8">
                <div className="mb-3"><Target size={20} className="text-[#a367dc] dark:text-purple-400" /></div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Indicators</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">
                  {mou.indicators?.length ? mou.indicators.map((i) => formatIndicatorName(i.name)).join(", ") : "-"}
                </p>
              </div>
            </div>

            {/* SIGNATORIES */}
            <div className="border-t border-slate-100 p-6 dark:border-slate-800 sm:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  <UserRound size={22} className="text-[#6771dc] dark:text-indigo-400" /> Signatories
                </h3>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {mou.participants?.length || 0}
                </span>
              </div>
              
              {mou.participants?.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {udiinusSide && (
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-slate-700/80 dark:bg-slate-800/30">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#6771dc]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6771dc] dark:bg-[#6771dc]/25 dark:text-indigo-300">
                        <Building2 size={14} /> Universitas Dian Nuswantoro
                      </div>
                      <div className="space-y-4 text-sm">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Signatory</p>
                          <p className="mt-1 font-semibold text-slate-900 dark:text-white">{udiinusSide.signatory_name || "-"}</p>
                          <p className="text-slate-600 dark:text-slate-400">{udiinusSide.signatory_position || "-"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Address</p>
                          <p className="mt-1 inline-flex items-start gap-2 text-slate-600 dark:text-slate-300">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                            <span className="leading-relaxed">{udiinusSide.address || "-"}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {partnerSide && (
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-slate-700/80 dark:bg-slate-800/30">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#6771dc]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6771dc] dark:bg-[#6771dc]/25 dark:text-indigo-300">
                        <Building2 size={14} /> {mou.partner?.name || "Partner Institution"}
                      </div>
                      <div className="space-y-4 text-sm">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Signatory</p>
                          <p className="mt-1 font-semibold text-slate-900 dark:text-white">{partnerSide.signatory_name || "-"}</p>
                          <p className="text-slate-600 dark:text-slate-400">{partnerSide.signatory_position || "-"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Address</p>
                          <p className="mt-1 inline-flex items-start gap-2 text-slate-600 dark:text-slate-300">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                            <span className="leading-relaxed">{partnerSide.address || "-"}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-8 text-center dark:border-slate-700 dark:bg-slate-800/30">
                  <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400 dark:bg-slate-800 dark:text-slate-500"><Inbox className="h-5 w-5" /></div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No data available</p>
                </div>
              )}
            </div>

            {/* RELATED MOAS*/}
            <div className="border-t border-slate-100 bg-slate-50/30 p-6 dark:border-slate-800 dark:bg-slate-900/30 sm:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  <FileSignature size={22} className="text-[#67b7dc] dark:text-sky-400" /> Related MoA
                </h3>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {relatedMoas.length || 0}
                </span>
              </div>
              
              <div>
                {relatedMoas.length > 0 ? (
                  <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-1 gap-4">
                    {relatedMoas.map((moa) => {
                      const isMoaActive = String(moa.status || "").toLowerCase() === "active";
                      const moaPeriod = formatPeriod(moa.start_date, moa.end_date);
                      return (
                        <motion.div key={moa.id} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 pt-12 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                          <div className="absolute left-0 top-0 flex items-center gap-2 rounded-br-lg bg-[#67b7dc]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#67b7dc] dark:bg-[#67b7dc]/25 dark:text-sky-300">
                            <FileSignature size={14} /> MOA
                          </div>
                          <div className="mb-3 flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
                                {moa.title || "Untitled document"}
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
                          <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <p className="inline-flex items-center gap-2">
                              <Bookmark className="h-4 w-4 text-slate-800 dark:text-slate-500" />
                              <span>No. {moa.letter_number || "-"}</span>
                            </p>
                            <p className="inline-flex items-center gap-2">
                              <CalendarRange className="h-4 w-4 text-slate-800 dark:text-slate-500" />
                              <span>{moaPeriod}</span>
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center dark:border-slate-700 dark:bg-slate-800/30">
                    <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400 dark:bg-slate-800 dark:text-slate-500"><Inbox className="h-5 w-5" /></div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No related MoA found</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

function isPartnerSide(participant: MouParticipant) {
  return participant.side.toLowerCase() === "partner" || participant.partner_id !== null;
}

function formatIndicatorName(name: string) {
  return name
    .split(/[_\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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