"use client";

import { useAuth } from "@/context/AuthContext";
import { useTranslations, useLocale } from "next-intl";
import {
  TrendingUp,
  Users,
  Calendar,
  GraduationCap,
  Briefcase,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  trend?: string;
  color: string;
}) => (
  <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={22} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          <TrendingUp size={12} />
          {trend}
        </span>
      )}
    </div>
    <p className="text-3xl font-black text-white mb-1">{value}</p>
    <p className="text-xs text-slate-400 font-medium">{label}</p>
  </div>
);

const QuickAction = ({
  icon: Icon,
  label,
  href,
  color,
}: {
  icon: any;
  label: string;
  href: string;
  color: string;
}) => (
  <Link href={href}>
    <div className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
      >
        <Icon size={18} />
      </div>
      <span className="text-sm font-semibold text-white">{label}</span>
      <ArrowUpRight
        size={16}
        className="ml-auto text-slate-500 group-hover:text-primary transition-colors"
      />
    </div>
  </Link>
);

const ActivityItem = ({
  title,
  time,
  type,
}: {
  title: string;
  time: string;
  type: "event" | "training" | "job" | "system";
}) => {
  const colors = {
    event: "bg-purple-500/10 text-purple-400",
    training: "bg-cyan-500/10 text-cyan-400",
    job: "bg-emerald-500/10 text-emerald-400",
    system: "bg-amber-500/10 text-amber-400",
  };
  const icons = {
    event: Calendar,
    training: GraduationCap,
    job: Briefcase,
    system: Sparkles,
  };
  const Icon = icons[type];

  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colors[type]}`}
      >
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
          <Clock size={10} />
          {time}
        </p>
      </div>
    </div>
  );
};

export default function DashboardOverviewPage() {
  const { user, role } = useAuth();
  const t = useTranslations("Dashboard");
  const locale = useLocale();

  const firstName = user?.displayName?.split(" ")[0] || "User";

  return (
    <div className="flex flex-col gap-8 animate-entrance">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">
          {t("welcomeBack", { name: firstName })}
        </h1>
        <p className="text-slate-400 text-sm">{t("overviewSubtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={GraduationCap}
          label={t("coursesEnrolled")}
          value="3"
          trend="+1"
          color="bg-cyan-500/10 text-cyan-400"
        />
        <StatCard
          icon={Calendar}
          label={t("upcomingEvents")}
          value="5"
          color="bg-purple-500/10 text-purple-400"
        />
        <StatCard
          icon={Briefcase}
          label={t("jobMatches")}
          value="12"
          trend="+4"
          color="bg-emerald-500/10 text-emerald-400"
        />
        <StatCard
          icon={Users}
          label={t("connections")}
          value="48"
          trend="+7"
          color="bg-amber-500/10 text-amber-400"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-3 glass p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            {t("recentActivity")}
          </h2>
          <div className="flex flex-col">
            <ActivityItem
              title={t("activityTrainingEnrolled")}
              time={t("activityTimeToday")}
              type="training"
            />
            <ActivityItem
              title={t("activityEventRegistered")}
              time={t("activityTimeYesterday")}
              type="event"
            />
            <ActivityItem
              title={t("activityJobMatch")}
              time={t("activityTime2Days")}
              type="job"
            />
            <ActivityItem
              title={t("activityProfileUpdate")}
              time={t("activityTime3Days")}
              type="system"
            />
            <ActivityItem
              title={t("activityCertEarned")}
              time={t("activityTimeLastWeek")}
              type="training"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            {t("quickActions")}
          </h2>
          <QuickAction
            icon={GraduationCap}
            label={t("browseCourses")}
            href={`/${locale}/dashboard/training`}
            color="bg-cyan-500/10 text-cyan-400"
          />
          <QuickAction
            icon={Calendar}
            label={t("viewEvents")}
            href={`/${locale}/dashboard/events`}
            color="bg-purple-500/10 text-purple-400"
          />
          <QuickAction
            icon={Briefcase}
            label={t("exploreJobs")}
            href={`/${locale}/dashboard/jobs`}
            color="bg-emerald-500/10 text-emerald-400"
          />
          <QuickAction
            icon={Users}
            label={t("editProfile")}
            href={`/${locale}/dashboard/profile`}
            color="bg-amber-500/10 text-amber-400"
          />
        </div>
      </div>
    </div>
  );
}
