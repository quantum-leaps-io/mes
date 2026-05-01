"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Zap, LogIn } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isRtl = locale === 'ar' || locale === 'ckb';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      const code = err?.code || "";
      const errorMap: Record<string, string> = {
        "auth/invalid-credential": t("errorInvalidCredential"),
        "auth/user-not-found": t("errorUserNotFound"),
        "auth/wrong-password": t("errorWrongPassword"),
        "auth/too-many-requests": t("errorTooManyRequests"),
        "auth/user-disabled": t("errorUserDisabled"),
        "auth/network-request-failed": t("errorNetwork"),
      };
      setError(errorMap[code] || t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md glass border border-white/10 rounded-3xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary glow-primary flex items-center justify-center mb-4">
            <LogIn className="text-background" size={32} />
          </div>
          <h1 className="text-2xl font-black">{t("signIn")}</h1>
          <p className="text-slate-400 text-sm mt-2">{t("submitLogin")}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">{t("email")}</label>
            <Input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-white/5 border-white/10 focus-visible:ring-primary/50" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold">{t("password")}</label>
            <Input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="bg-white/5 border-white/10 focus-visible:ring-primary/50" 
            />
          </div>

          {error && <p className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg">{error}</p>}

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary hover:bg-primary/90 text-background font-bold h-12"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Zap className="animate-spin" size={16} /> ...
              </span>
            ) : (
              t("signIn")
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            {t("noAccount")}{" "}
            <Link href={`/${locale}/register`} className="text-primary hover:underline font-bold">
              {t("signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
