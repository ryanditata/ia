import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SendHorizontal } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <div
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div ref={ref} className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl space-y-12"
        >
          {/* Section Header */}
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              Contact Us
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              If you have any questions or need further information, feel free to
              reach out to us.
            </p>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name and credentials..."
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="representative@institution.edu"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us about your collaboration proposal or inquiry..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary-700 cursor-pointer"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <SendHorizontal size={18} strokeWidth={2.5} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
