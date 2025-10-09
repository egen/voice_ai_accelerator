import { Button } from "./ui/button";
import egenLogo from '../assets/egen_logo.png';

export function Header({ onAnalyticsClick, onTranscriptsClick, onDashboardClick, currentView }: { onAnalyticsClick?: () => void; onTranscriptsClick?: () => void; onDashboardClick?: () => void; currentView?: string }) {
  const tabs = ["Dashboard", "Bot Profiles", "Analytics", "Transcripts"];
  
  const getActiveTab = () => {
    switch (currentView) {
      case "dashboard": return "Dashboard";
      case "bot-profiles": return "Bot Profiles";
      case "reports": return "Analytics";
      case "transcripts": return "Transcripts";
      case "transcript-viewer": return "Transcripts";
      default: return "Dashboard";
    }
  };
  
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Logo, Title, and Navigation Buttons */}
        <div className="flex items-center">
          <img src={egenLogo} alt="Egen Logo" className="h-8 w-auto" />
          <h1 className="text-white ml-3">Voice AI Accelerator</h1>
          <div className="flex-shrink-0" style={{ width: '2.5rem' }}></div>
          <div className="flex items-center space-x-4 md:space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md transition-colors ${
                  tab === getActiveTab()
                    ? "bg-slate-800 text-white" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                onClick={() => {
                  if (tab === "Dashboard") {
                    if (onDashboardClick) {
                      onDashboardClick();
                    }
                  }
                  if (tab === "Bot Profiles") {
                    if (window && window.dispatchEvent) {
                      window.dispatchEvent(new CustomEvent("navigate-bot-profiles"));
                    }
                  }
                  if (tab === "Analytics") {
                    if (onAnalyticsClick) {
                      onAnalyticsClick();
                    } else {
                      const el = document.getElementById("analytics-section");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }
                  if (tab === "Transcripts") {
                    if (onTranscriptsClick) {
                      onTranscriptsClick();
                    }
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Right: User Section */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}