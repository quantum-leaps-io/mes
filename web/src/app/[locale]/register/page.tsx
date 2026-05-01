"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile, OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [error, setError] = useState("");

  const isRtl = locale === 'ar' || locale === 'ckb';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      router.push(`/${locale}/onboarding`);
    } catch (err: any) {
      const code = err?.code || "";
      const errorMap: Record<string, string> = {
        "auth/email-already-in-use": t("errorEmailInUse"),
        "auth/weak-password": t("errorWeakPassword"),
        "auth/invalid-email": t("errorInvalidEmail"),
        "auth/too-many-requests": t("errorTooManyRequests"),
        "auth/network-request-failed": t("errorNetwork"),
      };
      setError(errorMap[code] || t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInSignUp = async () => {
    setLinkedinLoading(true);
    setError("");
    try {
      const provider = new OAuthProvider('microsoft.com');
      // LinkedIn sign-in via Microsoft (OIDC) or custom provider
      // For now, this uses the Microsoft provider as a placeholder
      // You'll need to configure LinkedIn as an OIDC provider in Firebase Console
      await signInWithPopup(auth, provider);
      router.push(`/${locale}/onboarding`);
    } catch (err: any) {
      const code = err?.code || "";
      const errorMap: Record<string, string> = {
        "auth/popup-closed-by-user": t("errorPopupClosed"),
        "auth/account-exists-with-different-credential": t("errorAccountExists"),
        "auth/network-request-failed": t("errorNetwork"),
      };
      setError(errorMap[code] || t("errorGeneric"));
    } finally {
      setLinkedinLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-lg glass border border-white/10 rounded-3xl p-10 relative z-10 animate-entrance">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center mb-5 overflow-hidden">
            <img src="/logo.png" alt="MUC ecoSystem" className="w-full h-full object-contain p-0.5" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">{t("signUp")}</h1>
          <p className="text-slate-400 text-sm mt-2">{t("signUpSubtitle")}</p>
        </div>

        {/* LinkedIn Sign Up */}
        <Button
          type="button"
          onClick={handleLinkedInSignUp}
          disabled={linkedinLoading}
          className="w-full h-12 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-8"
        >
          {linkedinLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <LinkedInIcon size={20} />
              {t("signUpLinkedIn")}
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t("or")}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">{t("firstName")}</label>
              <Input 
                type="text" 
                required 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder={t("firstNamePlaceholder")}
                className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-11 rounded-xl placeholder:text-slate-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">{t("lastName")}</label>
              <Input 
                type="text" 
                required 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder={t("lastNamePlaceholder")}
                className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-11 rounded-xl placeholder:text-slate-600" 
              />
            </div>
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">{t("email")}</label>
            <Input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder={t("emailPlaceholder")}
              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-11 rounded-xl placeholder:text-slate-600" 
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">{t("phone")}</label>
            <Input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder={t("phonePlaceholder")}
              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-11 rounded-xl placeholder:text-slate-600" 
            />
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">{t("password")}</label>
            <Input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder={t("passwordPlaceholder")}
              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 h-11 rounded-xl placeholder:text-slate-600" 
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-xl border border-red-400/20">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary hover:bg-primary/90 text-background font-bold h-12 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                {t("creatingAccount")}
              </span>
            ) : (
              t("submitRegister")
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            {t("hasAccount")}{" "}
            <Link href={`/${locale}/login`} className="text-primary hover:underline font-bold">
              {t("signIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
