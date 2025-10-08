import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronRight, ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import { CreateBotDialog } from "./CreateBotDialog";
import { SimpleDialog } from "./SimpleDialog";

export function BotProfiles() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  
  const bots = [
  { name: "Bot A", status: "active", industry: "Healthcare", model: "gemini-live-2.5-flash", prompts: "How can I help you today?" },
  { name: "Bot B", status: "inactive", industry: "Finance", model: "gemini-live-2.5-flash", prompts: "What financial service do you need?" },
  { name: "Bot C", status: "active", industry: "Retail", model: "gpt-4", prompts: "Looking for a product?" },
  { name: "Bot D", status: "active", industry: "Technology", model: "gemini-live-2.5-flash", prompts: "Tech support available." },
  { name: "Bot E", status: "inactive", industry: "Healthcare", model: "gpt-4", prompts: "Schedule an appointment?" },
  { name: "Bot F", status: "active", industry: "Finance", model: "llama-3", prompts: "Investment advice?" },
  ];
  
  const filteredBots = bots.filter(bot => {
    const statusMatch = statusFilter === "all" || bot.status === statusFilter;
    const industryMatch = industryFilter === "all" || bot.industry.toLowerCase() === industryFilter.toLowerCase();
    return statusMatch && industryMatch;
  });
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [editBot, setEditBot] = useState<any | null>(null);

  const [createBotOpen, setCreateBotOpen] = useState(false);

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
          <div key={index} className="border border-gray-200 rounded-md mb-2">
            <button
              className="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-50 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
              aria-controls={`bot-accordion-panel-${index}`}
              style={{ outline: 'none', border: 'none', background: 'none' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
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
                {openIndex === index ? (
                  <ChevronDown className="w-4 h-4 text-slate-600 transition-transform" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-600 transition-transform" />
                )}
              </div>
            </button>
            {openIndex === index && (
              <div
                id={`bot-accordion-panel-${index}`}
                className="p-4 bg-slate-50 border-t border-gray-200 flex flex-col gap-2"
                style={{ animation: 'fadeIn 0.2s' }}
              >
                <div className="text-sm text-gray-700 mb-2">Industry: <span className="font-medium">{bot.industry}</span></div>
                <div className="text-sm text-gray-700 mb-2">Model: <span className="font-medium">{bot.model}</span></div>
                <div className="text-sm text-gray-700">Prompts: <span className="font-medium">{bot.prompts}</span></div>
                <button
                  className="mt-2 self-end p-1 bg-slate-900 text-white rounded-full" style={{ borderRadius: '15px', height: '25px' }}
                  onClick={() => { setEditBot(bot); setCreateBotOpen(true); }}
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    {/* CreateBotDialog integration */}
    {editBot && (
      <SimpleDialog open={createBotOpen} onClose={() => setCreateBotOpen(false)}>
        <CreateBotDialog
          open={!!editBot}
          onOpenChange={(open: boolean) => {
            if (!open) setEditBot(null);
          }}
          initialValues={editBot}
        />
      </SimpleDialog>
    )}
    </div>
  );
}