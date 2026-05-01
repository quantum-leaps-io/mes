"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

interface OrganizationFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function OrganizationForm({ onBack, onSuccess }: OrganizationFormProps) {
  const t = useTranslations("Onboarding");
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    industry: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Wait for user

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        role: "organization",
        profile: formData,
        onboardingCompleted: true,
        updatedAt: new Date()
      }, { merge: true });

      // In a real app we might want to refresh custom claims via a Callable Function here
      onSuccess();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ChevronLeft size={20} />
        <span className="font-semibold">{t("back")}</span>
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-300 ml-1">{t("companyName")}</label>
          <input 
            required 
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            type="text" 
            className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-300 ml-1">{t("fullName")}</label>
          <input 
            required 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            type="text" 
            className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-300 ml-1">{t("industry")}</label>
          <input 
            required 
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            type="text" 
            className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" 
          />
        </div>

        <Button 
          disabled={isSubmitting}
          className="mt-6 py-7 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-purple-500 hover:bg-purple-400 glow-secondary shadow-purple-500/20 text-background"
        >
          {isSubmitting ? "..." : t("submit")}
        </Button>
      </form>
    </div>
  );
}
