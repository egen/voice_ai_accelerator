import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function BotProfiles() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  
  const bots = [
    { name: "Bot A", status: "active", industry: "Healthcare" },
    { name: "Bot B", status: "inactive", industry: "Finance" },
    { name: "Bot C", status: "active", industry: "Retail" },
    { name: "Bot D", status: "active", industry: "Technology" },
    { name: "Bot E", status: "inactive", industry: "Healthcare" },
    { name: "Bot F", status: "active", industry: "Finance" },
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
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-slate-50 cursor-pointer flex-shrink-0"
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-gray-700 font-medium">{bot.name}</span>
              <span className="text-xs text-gray-500">{bot.industry}</span>
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
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}