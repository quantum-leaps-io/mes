"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LogIn, Home, CheckCircle } from "lucide-react";

export default function LogoutPage() {
  const locale = useLocale();
  const t = useTranslations("Logout");
  const [done, setDone] = useState(false);

  useEffect(() => {
    signOut(auth).then(() => setDone(true)).catch(() => setDone(true));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      {/* Ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--glow-primary), transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, var(--glow-secondary), transparent 70%)' }} />
      </div>

      <div className="relative glass rounded-3xl p-10 sm:p-14 max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center glow-primary">
          <CheckCircle size={40} className="text-primary" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            {done ? t("title") : t("loading")}
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {t("message")}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={`/${locale}/login`}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-background text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
          >
            <LogIn size={18} />
            {t("loginButton")}
          </Link>

          <Link
            href={`/${locale}`}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{
              background: 'var(--surface-subtle)',
              color: 'var(--text-heading)',
              border: '1px solid var(--border-medium)'
            }}
          >
            <Home size={18} />
            {t("homeButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
