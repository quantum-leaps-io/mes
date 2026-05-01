import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LandingContent } from "@/components/home/LandingContent";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <DashboardLayout>
      <LandingContent locale={locale} />
    </DashboardLayout>
  );
}
