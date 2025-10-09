import { Button } from "./ui/button";
import egenLogo from '../assets/egen_logo.png';

export function Header({ onAnalyticsClick, onTranscriptsClick, onDashboardClick, currentView }: { onAnalyticsClick?: () => void; onTranscriptsClick?: () => void; onDashboardClick?: () => void; currentView?: string }) {
  const tabs = ["Dashboard", "Analytics", "Transcripts"];
  
  const getActiveTab = () => {
    switch (currentView) {
      case "dashboard": return "Dashboard";
      case "reports": return "Analytics";
      case "transcripts": return "Transcripts";
      case "transcript-viewer": return "Transcripts";
      default: return "Dashboard";
    }
  };
  
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Title - Always on the left */}
        <div className="flex items-center space-x-3">
          <img src={egenLogo} alt="Egen Logo" className="h-8 w-auto" />
          <h1 className="text-white">Voice AI Accelerator</h1>
        </div>
        
        {/* Navigation and User Section - Right side on md+ devices */}
        <div className="flex items-center space-x-6 md:space-x-6">
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {tabs.map((tab, index) => (
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
          
          {/* User Section */}
          <div className="flex items-center space-x-4 border-l border-slate-700 pl-6">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-sm">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}