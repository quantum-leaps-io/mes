"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface IndividualWizardProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function IndividualWizard({ onBack, onSuccess }: IndividualWizardProps) {
  const t = useTranslations("Onboarding");
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    phone: "",
    profession: "",
    university: "",
    degree: "",
    graduationYear: "",
    skillsTechnical: "",
    expRole: "",
    companyName: "",
    expDuration: ""
  });

  useEffect(() => {
    // Load draft if it exists in Firebase
    async function fetchDraft() {
      if (!user) return;
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.onboardingDraft && !data.onboardingCompleted && data.role === "individual_draft") {
            setFormData(prev => ({ ...prev, ...data.onboardingDraft }));
          }
        }
      } catch (err) {
        console.error("Error fetching draft", err);
      }
    }
    fetchDraft();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveDraft = async () => {
    if (!user) {
      alert("Authentication required to save draft.");
      return;
    }
    setIsSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        role: "individual_draft",
        onboardingDraft: formData,
        updatedAt: new Date()
      }, { merge: true });
    } catch (err) {
      console.error("Save draft failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (step < 4) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        role: "individual", // Officially lock role
        profile: formData,
        onboardingCompleted: true,
        onboardingDraft: null,
        updatedAt: new Date()
      }, { merge: true });

      onSuccess();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col gap-5">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">{t("wizardStep1")}</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("fullName")}</label>
              <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("profession")}</label>
              <input required name="profession" value={formData.profession} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("personalLocation")}</label>
              <input name="location" value={formData.location} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("personalPhone")}</label>
              <input name="phone" value={formData.phone} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col gap-5">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">{t("wizardStep2")}</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("university")}</label>
              <input required name="university" value={formData.university} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("educationDegree")}</label>
              <input required name="degree" value={formData.degree} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("educationGradYear")}</label>
              <input required name="graduationYear" value={formData.graduationYear} onChange={handleChange} type="number" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col gap-5">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">{t("wizardStep3")}</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("skillsTechnical")}</label>
              <input name="skillsTechnical" value={formData.skillsTechnical} onChange={handleChange} type="text" placeholder="e.g. React, Node.js, Leadership" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col gap-5">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">{t("wizardStep4")}</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("companyName")}</label>
              <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Previous or current company" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("expRole")}</label>
              <input name="expRole" value={formData.expRole} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 ml-1">{t("expDuration")}</label>
              <input name="expDuration" value={formData.expDuration} onChange={handleChange} type="text" className="bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full relative">
      <div className="flex items-center justify-between mb-8">
        <button 
          type="button"
          onClick={step === 1 ? onBack : handlePrev}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-semibold">{t("back")}</span>
        </button>
        
        {/* Progress Dots */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${step === idx ? 'w-8 bg-cyan-400 glow-primary' : (step > idx ? 'w-4 bg-cyan-400/50' : 'w-2 bg-white/10')}`} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {renderStep()}

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button 
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex-1 sm:flex-none w-full sm:w-auto py-7 px-6 rounded-2xl border-white/10 hover:bg-white/5 text-slate-300 transition-all font-semibold"
          >
            <Save className="mr-2" size={18} />
            {isSaving ? t("saving") : t("saveDraft")}
          </Button>

          <Button 
            type="submit"
            disabled={isSubmitting}
            className="flex flex-1 w-full py-7 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-primary hover:bg-cyan-400 glow-primary shadow-cyan-500/20 text-background"
          >
            {step < 4 ? (
              <span className="flex items-center gap-2">{t("next")} <ChevronRight size={20} /></span>
            ) : (
              isSubmitting ? "..." : t("submit")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
