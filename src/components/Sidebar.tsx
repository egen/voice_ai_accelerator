import { Button } from "./ui/button";

interface SidebarProps {
  onCreateBot: () => void;
  onStartCall: () => void;
  onViewReports: () => void;
}

export function Sidebar({ onCreateBot, onStartCall, onViewReports }: SidebarProps) {
  return (
    <aside className="w-48 bg-slate-50 border-r border-slate-200 p-4" style={{ marginTop: '56px', height: '100%' }}>
      <div className="space-y-3">
        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white"
          onClick={onCreateBot}>
          Create Bot
        </Button>
        <Button
          variant="outline"
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
          onClick={onStartCall}
        >
          Start Call
        </Button>
        <Button
          variant="outline"
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
          onClick={onViewReports}
        >
          View Reports
        </Button>
      </div>
    </aside>
  );
}