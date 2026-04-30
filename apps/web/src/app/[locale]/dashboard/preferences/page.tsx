"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { locales } from "@/i18n";
import { Settings, Globe, Sun, Moon, Monitor, Check } from "lucide-react";

export default function PreferencesPage() {
  const t = useTranslations("Preferences");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath || `/${newLocale}`);
  };

  const languageOptions = [
    { code: "en", label: "English", native: "English", flag: "🇬🇧" },
    { code: "ar", label: t("arabic"), native: "العربية", flag: "🇮🇶" },
    { code: "ckb", label: t("kurdish"), native: "کوردی", flag: "🇮🇶" },
  ];

  const themeOptions = [
    {
      value: "dark" as const,
      label: t("dark"),
      icon: Moon,
      desc: t("darkDesc"),
    },
    {
      value: "light" as const,
      label: t("light"),
      icon: Sun,
      desc: t("lightDesc"),
    },
  ];

  return (
    <div className="flex flex-col gap-10 animate-entrance max-w-3xl">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <Settings size={28} className="text-primary" />
          {t("title")}
        </h1>
        <p className="text-slate-400 text-sm">{t("subtitle")}</p>
      </div>

      {/* Language Section */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Globe size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t("language")}</h2>
            <p className="text-xs text-slate-400">{t("languageDesc")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLocaleChange(lang.code)}
              className={`
                glass p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer
                hover:-translate-y-1 group relative
                ${locale === lang.code
                  ? "border-primary/50 bg-primary/5"
                  : "border-white/5 hover:border-white/10"
                }
              `}
            >
              {locale === lang.code && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check size={14} className="text-background" />
                </div>
              )}
              <span className="text-2xl mb-3 block">{lang.flag}</span>
              <p className="font-bold text-white text-sm">{lang.native}</p>
              <p className="text-xs text-slate-500 mt-0.5">{lang.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Theme Section */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Sun size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t("theme")}</h2>
            <p className="text-xs text-slate-400">{t("themeDesc")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={`
                glass p-6 rounded-2xl border transition-all duration-300 text-left cursor-pointer
                hover:-translate-y-1 group relative
                ${theme === opt.value
                  ? "border-primary/50 bg-primary/5"
                  : "border-white/5 hover:border-white/10"
                }
              `}
            >
              {theme === opt.value && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check size={14} className="text-background" />
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                opt.value === "dark" 
                  ? "bg-slate-800 text-slate-200" 
                  : "bg-amber-100 text-amber-600"
              }`}>
                <opt.icon size={24} />
              </div>
              <p className="font-bold text-white text-base">{opt.label}</p>
              <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
