"use client";

import { useTranslations } from "next-intl";
import { GraduationCap, Clock, CheckCircle2, PlayCircle, Lock } from "lucide-react";

const CourseCard = ({
  title,
  category,
  progress,
  status,
}: {
  title: string;
  category: string;
  progress: number;
  status: "active" | "completed" | "locked";
}) => {
  const statusColors = {
    active: "text-cyan-400",
    completed: "text-emerald-400",
    locked: "text-slate-500",
  };
  const StatusIcon = {
    active: PlayCircle,
    completed: CheckCircle2,
    locked: Lock,
  }[status];

  return (
    <div className={`glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 ${status === "locked" ? "opacity-50" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <GraduationCap size={20} />
        </div>
        <StatusIcon size={18} className={statusColors[status]} />
      </div>
      <h3 className="text-base font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{category}</p>
      {status !== "locked" && (
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {status !== "locked" && (
        <p className="text-xs text-slate-500 mt-2">{progress}% complete</p>
      )}
    </div>
  );
};

export default function TrainingPage() {
  const t = useTranslations("Dashboard");

  return (
    <div className="flex flex-col gap-8 animate-entrance">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">{t("trainingTitle")}</h1>
        <p className="text-slate-400 text-sm">{t("trainingSubtitle")}</p>
      </div>

      {/* Active Courses */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <PlayCircle size={14} className="text-cyan-400" />
          {t("activeCourses")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CourseCard title={t("courseLeadership")} category={t("categoryBusiness")} progress={72} status="active" />
          <CourseCard title={t("courseDataScience")} category={t("categoryTech")} progress={45} status="active" />
          <CourseCard title={t("courseDesignThinking")} category={t("categoryCreative")} progress={20} status="active" />
        </div>
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-400" />
          {t("completedCourses")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CourseCard title={t("courseProjectMgmt")} category={t("categoryBusiness")} progress={100} status="completed" />
        </div>
      </div>

      {/* Locked */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Lock size={14} className="text-slate-500" />
          {t("upcomingCourses")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CourseCard title={t("courseAI")} category={t("categoryTech")} progress={0} status="locked" />
          <CourseCard title={t("courseEntrepreneurship")} category={t("categoryBusiness")} progress={0} status="locked" />
        </div>
      </div>
    </div>
  );
}
