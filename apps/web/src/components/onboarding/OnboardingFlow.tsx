"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { User, Building2, ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function OnboardingFlow() {
  const t = useTranslations("Onboarding");
  const router = useRouter();
  const [role, setRole] = useState<"individual" | "organization" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mocking the backend call logic for now since this is the UI stub
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Wait a moment so the user sees the success state
      setTimeout(() => {
        // We'll redirect them to dashboard (using regular Next.js router might not persist locale flawlessly if we aren't using next-intl router, but window.location.reload works if we just want to refresh their Claims)
        router.push("./dashboard");
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 glow-primary border border-emerald-500/30">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-2">{t("success")}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-10">
      <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] blur-[120px] rounded-full -z-10 opacity-20 transition-all duration-700 ${role === 'organization' ? 'bg-purple-500' : 'bg-primary'}`} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {t("title")}
          </h1>
          <p className="text-slate-400 text-lg font-medium">{t("subtitle")}</p>
        </div>

        {!role ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-in fade-in duration-500">
            <button
              onClick={() => setRole("individual")}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <User size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("individual")}</h3>
              <p className="text-slate-400 text-sm leading-relaxed px-2">
                {t("individualDesc")}
              </p>
            </button>

            <button
              onClick={() => setRole("organization")}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Building2 size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("organization")}</h3>
              <p className="text-slate-400 text-sm leading-relaxed px-2">
                {t("organizationDesc")}
              </p>
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setRole(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ChevronLeft size={20} />
              <span className="font-semibold">{t("back")}</span>
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {role === "individual" ? (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">{t("fullName")}</label>
                    <input required type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">{t("profession")}</label>
                    <input required type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">{t("university")}</label>
                    <input required type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">{t("companyName")}</label>
                    <input required type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">{t("fullName")}</label>
                    <input required type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">{t("industry")}</label>
                    <input required type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                  </div>
                </>
              )}

              <Button 
                disabled={isSubmitting}
                className={`mt-6 py-7 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${role === 'organization' ? 'bg-purple-500 hover:bg-purple-400 glow-secondary shadow-purple-500/20' : 'bg-primary hover:bg-cyan-400 glow-primary shadow-cyan-500/20'} text-background`}
              >
                {isSubmitting ? "..." : t("submit")}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
