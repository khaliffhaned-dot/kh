"use client";

import { useState } from "react";
import { SemakSidebar } from "./sidebar";
import { SemakTopbar } from "./topbar";
import type { ModuleId } from "./types";
import { OverviewModule } from "./modules/overview-module";
import { FeedModule } from "./modules/feed-module";
import { SentimentModule } from "./modules/sentiment-module";
import { AmecModule } from "./modules/amec-module";
import { RoiModule } from "./modules/roi-module";
import { KolModule } from "./modules/kol-module";
import { CrisisModule } from "./modules/crisis-module";
import { CompetitorModule } from "./modules/competitor-module";
import { MediaModule } from "./modules/media-module";

export function SemakDashboard({ defaultModule = "overview" as ModuleId }) {
  const [module, setModule] = useState<ModuleId>(defaultModule);

  return (
    <div className="flex min-h-screen bg-[#F5F3EE] font-[family-name:var(--font-ibm-plex-sans)] text-[#12202E]">
      <SemakSidebar activeModule={module} onNavigate={setModule} />

      <div className="flex min-w-0 flex-1 flex-col">
        <SemakTopbar activeModule={module} />

        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-7">
          {module === "overview" && <OverviewModule onNavigate={setModule} />}
          {module === "feed" && <FeedModule />}
          {module === "sentiment" && <SentimentModule />}
          {module === "amec" && <AmecModule />}
          {module === "roi" && <RoiModule />}
          {module === "kol" && <KolModule />}
          {module === "crisis" && <CrisisModule />}
          {module === "competitor" && <CompetitorModule />}
          {module === "media" && <MediaModule />}
        </div>
      </div>
    </div>
  );
}
