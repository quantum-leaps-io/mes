"use client";

import { useTranslations } from "next-intl";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventCard = ({
  title,
  date,
  time,
  location,
  attendees,
  type,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: "workshop" | "networking" | "conference" | "webinar";
}) => {
  const typeColors = {
    workshop: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    networking: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    conference: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    webinar: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${typeColors[type]}`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Users size={12} />
          {attendees}
        </div>
      </div>
      <h3 className="text-base font-bold text-white mb-3">{title}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar size={12} className="text-primary" />
          {date}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock size={12} className="text-primary" />
          {time}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <MapPin size={12} className="text-primary" />
          {location}
        </div>
      </div>
      <Button className="w-full mt-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold h-9 rounded-xl">
        Register
      </Button>
    </div>
  );
};

export default function EventsPage() {
  const t = useTranslations("Dashboard");

  return (
    <div className="flex flex-col gap-8 animate-entrance">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">{t("eventsTitle")}</h1>
        <p className="text-slate-400 text-sm">{t("eventsSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <EventCard
          title={t("eventCareerFair")}
          date="May 15, 2026"
          time="10:00 AM - 4:00 PM"
          location="MUC Main Campus"
          attendees={142}
          type="conference"
        />
        <EventCard
          title={t("eventTechWorkshop")}
          date="May 20, 2026"
          time="2:00 PM - 5:00 PM"
          location="Online (Zoom)"
          attendees={56}
          type="workshop"
        />
        <EventCard
          title={t("eventNetworking")}
          date="May 25, 2026"
          time="6:00 PM - 9:00 PM"
          location="Innovation Hub, Floor 3"
          attendees={78}
          type="networking"
        />
        <EventCard
          title={t("eventStartupPitch")}
          date="June 1, 2026"
          time="11:00 AM - 1:00 PM"
          location="Online (Webinar)"
          attendees={210}
          type="webinar"
        />
        <EventCard
          title={t("eventAIWorkshop")}
          date="June 5, 2026"
          time="9:00 AM - 12:00 PM"
          location="Tech Lab, Building B"
          attendees={34}
          type="workshop"
        />
      </div>
    </div>
  );
}
