"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { User, Building2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { IndividualWizard } from "./IndividualWizard";
import { OrganizationForm } from "./OrganizationForm";

export function OnboardingFlow() {
  const t = useTranslations("Onboarding");
  const router = useRouter();
  const [role, setRole] = useState<"individual" | "organization" | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      // Send them to dashboard
      router.push("./dashboard");
    }, 2000);
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
        ) : role === "individual" ? (
          <IndividualWizard onBack={() => setRole(null)} onSuccess={handleSuccess} />
        ) : (
          <OrganizationForm onBack={() => setRole(null)} onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
}
