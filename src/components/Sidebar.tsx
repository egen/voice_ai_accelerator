import { Button } from "./ui/button";

export function Sidebar() {
  return (
  <aside className="w-48 bg-slate-50 border-r border-slate-200 p-4" style={{ marginTop: '56px', height: '100%' }}>
      <div className="space-y-3">
        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
          Create Bot
        </Button>
        <Button
          variant="outline"
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
          onClick={() => {
            const el = document.getElementById("quick-test-section");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Start Call
        </Button>
        <Button
          variant="outline"
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
          onClick={() => {
            const el = document.getElementById("analytics-section");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          View Reports
        </Button>
      </div>
    </aside>
  );
}