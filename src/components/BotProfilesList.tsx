import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export interface BotProfile {
  name: string;
  status: string;
  industry: string;
  model: string;
  description?: string;
}

interface BotProfilesListProps {
  bots?: BotProfile[];
  onViewBotDetail: (bot: BotProfile) => void;
  onBack: () => void;
}

const sampleBots: BotProfile[] = [
  {
    name: "HealthCare Assistant",
    status: "active",
    industry: "Healthcare",
    model: "gemini-live-2.5-flash",
    description: "Advanced healthcare assistant specialized in patient queries and medical information."
  },
  {
    name: "Financial Advisor",
    status: "inactive",
    industry: "Finance",
    model: "gemini-live-2.5-flash",
    description: "Financial advisor bot providing investment and banking assistance."
  },
  {
    name: "Retail Assistant",
    status: "active",
    industry: "Retail",
    model: "gpt-4",
    description: "E-commerce assistant helping customers find and purchase products."
  },
  {
    name: "Medical Scheduler",
    status: "inactive",
    industry: "Healthcare",
    model: "gpt-4",
    description: "Medical appointment scheduling and patient care coordinator."
  },
  {
    name: "Investment Advisor",
    status: "active",
    industry: "Finance",
    model: "llama-3",
    description: "Investment advisor providing portfolio management and financial planning."
  },
  {
    name: "Public Sector Assistant",
    status: "active",
    industry: "Public Sector",
    model: "gpt-4",
    description: "Public sector bot for citizen services, government information, and civic engagement."
  }
];

export function BotProfilesList({ bots = sampleBots, onViewBotDetail, onBack }: BotProfilesListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>
      <div style={{ marginTop: '2%' }}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <div key={bot.name} className="bg-white rounded-lg shadow border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">{bot.name}</h2>
              <div className="text-sm text-slate-600 mb-1">
                Status: <span className={`font-medium ${bot.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-slate-600 mb-1">Industry: <span className="font-medium">{bot.industry}</span></div>
              <div className="text-sm text-slate-600 mb-1">Model: <span className="font-medium">{bot.model}</span></div>
              <div className="text-xs text-slate-500 mb-2">{bot.description}</div>
            </div>
            <Button variant="default" onClick={() => onViewBotDetail(bot)} className="mt-4">View</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
