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
  Globe,
  Settings
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
        : "text-foreground/50 hover:text-foreground"}
    `}
    style={!active ? { background: 'var(--surface-subtle)' } : undefined}
    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--surface-hover)'; }}
    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'var(--surface-subtle)'; }}
    >
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
    <div className="flex items-center gap-2 p-1 rounded-full" style={{ background: 'var(--surface-subtle)', border: '1px solid var(--border-medium)' }}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleLocaleChange(l)}
          className={`
            px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
            ${locale === l 
              ? "bg-primary text-background glow-primary" 
              : "text-foreground/50 hover:text-foreground"}
          `}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAuth();
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Navigation");
  const authT = useTranslations("Auth");
  const isRtl = locale === 'ar' || locale === 'ckb';

  React.useEffect(() => {
    if (!loading && !user && pathname.includes("/dashboard")) {
      router.push(`/${locale}/login`);
    }
  }, [user, loading, pathname, locale, router]);

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
      {user && (
        <aside className="w-72 glass p-6 flex flex-col gap-8 hidden md:flex transition-all duration-500" style={{ borderInlineEnd: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="MUC ecoSystem" className="w-full h-full object-contain p-0.5" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">MUC ecoSystem</span>
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

          <div className="mt-auto pt-6 flex flex-col gap-1" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <SidebarItem icon={Settings} label={t("preferences")} href={`/${locale}/dashboard/preferences`} active={pathname === `/${locale}/dashboard/preferences`} />
            <SidebarItem icon={LogOut} label={t("logout")} href={`/${locale}/logout`} />
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-20 glass px-8 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          {!user && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="MUC ecoSystem" className="w-full h-full object-contain p-0.5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-foreground">MUC ecoSystem</span>
            </div>
          )}

          {user && (
            <button className="md:hidden text-foreground/50">
              <Menu size={24} />
            </button>
          )}
          
          <div className={`flex items-center gap-6 ${isRtl ? 'mr-auto ml-0' : 'ml-auto mr-0'}`}>
            <LocaleSwitcher />
            
            {user ? (
              <>
                <div className={`hidden sm:flex flex-col ${isRtl ? 'text-left' : 'text-right'}`}>
                  <p className="text-sm font-bold tracking-tight text-foreground">{user?.displayName || "User"}</p>
                  <p className="text-[10px] text-primary uppercase font-black tracking-widest">{role || "Member"}</p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[2px] glow-primary">
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center overflow-hidden">
                    <User size={24} className="text-foreground/40" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href={`/${locale}/login`} className="text-sm font-bold text-foreground/60 hover:text-foreground transition-colors">
                  {authT("signIn")}
                </Link>
                <Link href={`/${locale}/register`} className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-background text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                  {authT("signUp")}
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-10" style={{ background: 'var(--surface-subtle)' }}>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};
