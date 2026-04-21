"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Rocket, ShieldCheck, Users, Zap } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  const f = useTranslations("Features");
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ckb';

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-12 py-10">
        {/* Hero Section */}
        <div className={`flex flex-col gap-4 text-center ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit mx-auto ${isRtl ? 'md:mr-0 md:ml-auto' : 'md:ml-0 md:mr-auto'}`}>
            <Zap size={14} className="fill-primary" />
            <span className="text-xs font-bold uppercase tracking-wider">{t("welcome")}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 leading-tight">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-lg text-slate-400">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-background font-bold text-shadow-sm transition-all duration-300 hover:scale-105 active:scale-95">
              {t("getStarted")}
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5 transition-all duration-300">
              {t("explore")}
            </Button>
          </div>
        </div>

        {/* Stats / Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: Users, 
              title: f("matching"), 
              desc: f("matchingDesc"),
              color: "text-cyan-400"
            },
            { 
              icon: Rocket, 
              title: f("incubation"), 
              desc: f("incubationDesc"),
              color: "text-purple-400"
            },
            { 
              icon: ShieldCheck, 
              title: f("training"), 
              desc: f("trainingDesc"),
              color: "text-emerald-400"
            }
          ].map((feature, i) => (
            <div key={i} className="glass p-8 rounded-3xl group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
