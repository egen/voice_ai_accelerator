import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface Bot {
  name: string;
  status: string;
  industry: string;
  model: string;
  prompts: string;
  description?: string;
  apiKey?: string;
  maxTokens?: number;
  temperature?: number;
}

interface BotProfilesProps {
  onBotSelect?: (bot: Bot) => void;
}

export function BotProfiles({ onBotSelect }: BotProfilesProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  
  const bots: Bot[] = [
    { 
      name: "Bot A", 
      status: "active", 
      industry: "Healthcare", 
      model: "gemini-live-2.5-flash", 
      prompts: "How can I help you today?",
      description: "Advanced healthcare assistant specialized in patient queries and medical information.",
      apiKey: "sk-****************************",
      maxTokens: 2048,
      temperature: 0.7
    },
    { 
      name: "Bot B", 
      status: "inactive", 
      industry: "Finance", 
      model: "gemini-live-2.5-flash", 
      prompts: "What financial service do you need?",
      description: "Financial advisor bot providing investment and banking assistance.",
      apiKey: "sk-****************************",
      maxTokens: 1500,
      temperature: 0.5
    },
    { 
      name: "Bot C", 
      status: "active", 
      industry: "Retail", 
      model: "gpt-4", 
      prompts: "Looking for a product?",
      description: "E-commerce assistant helping customers find and purchase products.",
      apiKey: "sk-****************************",
      maxTokens: 1800,
      temperature: 0.8
    },
    { 
      name: "Bot D", 
      status: "active", 
      industry: "Technology", 
      model: "gemini-live-2.5-flash", 
      prompts: "Tech support available.",
      description: "Technical support specialist for software and hardware issues.",
      apiKey: "sk-****************************",
      maxTokens: 2500,
      temperature: 0.6
    },
    { 
      name: "Bot E", 
      status: "inactive", 
      industry: "Healthcare", 
      model: "gpt-4", 
      prompts: "Schedule an appointment?",
      description: "Medical appointment scheduling and patient care coordinator.",
      apiKey: "sk-****************************",
      maxTokens: 1200,
      temperature: 0.4
    },
    { 
      name: "Bot F", 
      status: "active", 
      industry: "Finance", 
      model: "llama-3", 
      prompts: "Investment advice?",
      description: "Investment advisor providing portfolio management and financial planning.",
      apiKey: "sk-****************************",
      maxTokens: 2200,
      temperature: 0.7
    },
  ];
  
  const filteredBots = bots.filter(bot => {
    const statusMatch = statusFilter === "all" || bot.status === statusFilter;
    const industryMatch = industryFilter === "all" || bot.industry.toLowerCase() === industryFilter.toLowerCase();
    return statusMatch && industryMatch;
  });
  


  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex-col" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Bot Profiles</h2>
      <div className="flex items-center gap-4 mb-4 flex-shrink-0">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 border-slate-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-48 border-slate-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
  <div className="flex-1 overflow-y-auto space-y-2 min-h-0" style={{ maxHeight: 'calc(5 * 60px)', minHeight: 'calc(5 * 60px)', overflowY: 'auto' }}>
        {filteredBots.map((bot, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-md mb-2 p-3 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
            onClick={() => onBotSelect?.(bot)}
          >
            <div className="flex items-center justify-between">
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span className="text-gray-700 font-medium hover:text-slate-900">
                  {bot.name}
                </span>
                <span className="text-xs text-gray-500">{bot.industry}</span>
                <span className="text-xs text-gray-400 mt-1">{bot.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: bot.status === 'active' ? '#22c55e' : '#ef4444',
                    minWidth: '12px',
                    minHeight: '12px'
                  }}
                ></div>
                <ChevronRight className="w-4 h-4 text-slate-600 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}