"use client";

import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, role } = useAuth();
  const t = useTranslations("Dashboard");

  return (
    <div className="flex flex-col gap-8 animate-entrance">
      <h1 className="text-3xl font-black tracking-tight text-white">{t("profileTitle")}</h1>

      {/* Profile Header Card */}
      <div className="glass p-8 rounded-2xl border border-white/5">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[2px] glow-primary shrink-0">
            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
              <User size={40} className="text-slate-400" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{user?.displayName || "User"}</h2>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mt-1">{role || "Member"}</p>
            <p className="text-slate-400 text-sm mt-3">{t("profileBioPlaceholder")}</p>
          </div>
          <Button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white gap-2 rounded-xl">
            <Edit3 size={16} />
            {t("editProfile")}
          </Button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t("contactInfo")}</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary" />
              <span className="text-sm text-white">{user?.email || "—"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary" />
              <span className="text-sm text-slate-400">{t("notProvided")}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm text-slate-400">{t("notProvided")}</span>
            </div>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t("professionalInfo")}</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase size={16} className="text-purple-400" />
              <span className="text-sm text-slate-400">{t("notProvided")}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap size={16} className="text-cyan-400" />
              <span className="text-sm text-slate-400">{t("notProvided")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
