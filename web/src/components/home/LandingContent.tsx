"use client";

import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  ShieldCheck, 
  Users, 
  Zap, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  LineChart, 
  Search, 
  Trophy, 
  Building,
  Target,
  Sparkles
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function LandingContent({ locale }: { locale: string }) {
  const t = useTranslations("Index");
  const f = useTranslations("Features");
  const b = useTranslations("Benefits");
  const authT = useTranslations("Auth");
  const isRtl = locale === 'ar' || locale === 'ckb';

  return (
    <div className="flex flex-col gap-12 py-10">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 text-center items-center max-w-4xl mx-auto py-12">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 leading-tight animate-entrance">
          {t("title")}
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed animate-entrance [animation-delay:300ms]">
          {t("description")}
        </p>
      </div>


      {/* Dual Persona Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* For Individuals */}
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 hover:border-cyan-500/20 transition-all duration-500 flex flex-col gap-10 group">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500 glow-primary">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white">{b("individualTitle")}</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: BookOpen, title: b("skillDev"), desc: b("skillDevDesc"), color: "text-blue-400" },
              { icon: Target, title: b("careerMatching"), desc: b("careerMatchingDesc"), color: "text-cyan-400" },
              { icon: Sparkles, title: b("mentorship"), desc: b("mentorshipDesc"), color: "text-amber-400" },
              { icon: Globe, title: b("networking"), desc: b("networkingDesc"), color: "text-indigo-400" },
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${benefit.color}`}>
                  <benefit.icon size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">{benefit.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* For Companies */}
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 hover:border-purple-500/20 transition-all duration-500 flex flex-col gap-10 group">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500 glow-secondary">
              <Building size={32} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white">{b("companiesTitle")}</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Search, title: b("talentPipeline"), desc: b("talentPipelineDesc"), color: "text-rose-400" },
              { icon: LineChart, title: b("streamlinedHiring"), desc: b("streamlinedHiringDesc"), color: "text-emerald-400" },
              { icon: Rocket, title: b("incubationSupport"), desc: b("incubationSupportDesc"), color: "text-purple-400" },
              { icon: Trophy, title: b("brandExposure"), desc: b("brandExposureDesc"), color: "text-orange-400" },
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${benefit.color}`}>
                  <benefit.icon size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">{benefit.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
