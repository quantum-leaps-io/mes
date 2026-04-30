"use client";

import { useTranslations } from "next-intl";
import { Briefcase, MapPin, Building, Clock, DollarSign, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobCard = ({
  title,
  company,
  location,
  type,
  salary,
  posted,
  match,
}: {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  match: number;
}) => (
  <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
        <Building size={22} className="text-primary" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          {match}% match
        </span>
        <button className="text-slate-500 hover:text-primary transition-colors">
          <Bookmark size={16} />
        </button>
      </div>
    </div>
    <h3 className="text-base font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-primary font-semibold mb-3">{company}</p>
    <div className="space-y-2 mb-5">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <MapPin size={12} />
        {location}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Briefcase size={12} />
        {type}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <DollarSign size={12} />
        {salary}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Clock size={12} />
        {posted}
      </div>
    </div>
    <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold h-9 rounded-xl border border-primary/20">
      Apply Now
    </Button>
  </div>
);

export default function JobsPage() {
  const t = useTranslations("Dashboard");

  return (
    <div className="flex flex-col gap-8 animate-entrance">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">{t("jobsTitle")}</h1>
        <p className="text-slate-400 text-sm">{t("jobsSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <JobCard
          title={t("jobFrontend")}
          company="TechVision Inc."
          location="Erbil, Iraq"
          type="Full-time"
          salary="$1,200 - $1,800/mo"
          posted="2 days ago"
          match={92}
        />
        <JobCard
          title={t("jobDataAnalyst")}
          company="DataFlow Solutions"
          location="Remote"
          type="Full-time"
          salary="$1,500 - $2,200/mo"
          posted="4 days ago"
          match={85}
        />
        <JobCard
          title={t("jobUX")}
          company="CreativeMinds Studio"
          location="Baghdad, Iraq"
          type="Part-time"
          salary="$800 - $1,200/mo"
          posted="1 week ago"
          match={78}
        />
        <JobCard
          title={t("jobMarketing")}
          company="GrowthLab"
          location="Sulaymaniyah, Iraq"
          type="Internship"
          salary="$500 - $700/mo"
          posted="3 days ago"
          match={74}
        />
      </div>
    </div>
  );
}
