import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
        <OnboardingFlow />
      </div>
    </DashboardLayout>
  );
}
