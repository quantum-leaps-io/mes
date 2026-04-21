"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Rocket, 
  GraduationCap, 
  Calendar, 
  Lightbulb,
  LogOut,
  Menu,
  Globe
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { locales } from "@/i18n";

const SidebarItem = ({ icon: Icon, label, href, active }: any) => (
  <Link href={href}>
    <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
      ${active 
        ? "bg-primary/20 text-primary glow-primary border border-primary/30" 
        : "text-slate-400 hover:bg-white/5 hover:text-white"}
    `}>
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </div>
  </Link>
);

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath || `/${newLocale}`);
  };

  const labels: Record<string, string> = {
    en: "English",
    ar: "عربي",
    ckb: "کوردی"
  };

  return (
    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleLocaleChange(l)}
          className={`
            px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
            ${locale === l 
              ? "bg-primary text-background glow-primary" 
              : "text-slate-400 hover:text-white"}
          `}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, role } = useAuth();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const isRtl = locale === 'ar' || locale === 'ckb';

  const menuItems = [
    { icon: LayoutDashboard, label: t("overview"), href: `/${locale}/dashboard` },
    { icon: User, label: t("profile"), href: `/${locale}/dashboard/profile` },
    { icon: GraduationCap, label: t("training"), href: `/${locale}/dashboard/training` },
    { icon: Calendar, label: t("events"), href: `/${locale}/dashboard/events` },
  ];

  // Role-specific items
  if (role === 'graduate') {
    menuItems.push({ icon: Briefcase, label: t("jobs"), href: `/${locale}/dashboard/jobs` });
  } else if (role === 'company_rep') {
    menuItems.push({ icon: User, label: t("candidates"), href: `/${locale}/dashboard/candidates` });
  } else if (role === 'startup_admin') {
    menuItems.push({ icon: Rocket, label: t("startup"), href: `/${locale}/dashboard/startup` });
    menuItems.push({ icon: Lightbulb, label: t("ideas"), href: `/${locale}/dashboard/ideas` });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-all duration-500" dir={isRtl ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside className={`w-72 glass border-e border-white/5 p-6 flex flex-col gap-8 hidden md:flex transition-all duration-500`}>
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary glow-primary flex items-center justify-center">
            <Rocket className="text-background" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">TalentHub</span>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.href} 
              {...item} 
              active={pathname === item.href} 
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <SidebarItem icon={LogOut} label={t("logout")} href={`/${locale}/logout`} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-20 glass border-b border-white/5 px-8 flex items-center justify-between">
          <button className="md:hidden text-slate-400">
            <Menu size={24} />
          </button>
          
          <div className={`flex items-center gap-6 ${isRtl ? 'mr-auto ml-0' : 'ml-auto mr-0'}`}>
            <LocaleSwitcher />
            
            <div className={`hidden sm:flex flex-col ${isRtl ? 'text-left' : 'text-right'}`}>
              <p className="text-sm font-bold tracking-tight">{user?.displayName || "User"}</p>
              <p className="text-[10px] text-primary uppercase font-black tracking-widest">{role || "Guest Mode"}</p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[2px] glow-primary">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center overflow-hidden">
                <User size={24} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-10 bg-slate-950/20">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};
