import { Button } from "./ui/button";
import egenLogo from '../assets/egen_logo.png';

export function Header({ onAnalyticsClick }: { onAnalyticsClick?: () => void }) {
  const tabs = ["Dashboard", "Bot Profiles", "Analytics", "Settings"];
  
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3">
          <img src={egenLogo} alt="Egen Logo" className="h-8 w-auto" />
          <h1 className="text-white">Voice AI Accelerator</h1>
        </div>
        <div className="flex items-center space-x-6">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md transition-colors ${
                index === 0 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => {
                if (tab === "Bot Profiles") {
                  const el = document.getElementById("bot-profiles-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
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
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-300">Home</span>
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}