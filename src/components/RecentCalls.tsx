import * as React from "react";
import { Separator } from "./ui/separator";

export function RecentCalls() {
  const calls = [
    { bot: "Bot C", industry: "Retail", duration: "05:20", status: "Completed", time: "02:30 PM" },
    { bot: "Bot F", industry: "Finance", duration: "03:10", status: "Completed", time: "05:00 PM" },
    { bot: "Bot A", industry: "Healthcare", duration: "03:45", status: "Completed", time: "10:30 AM" },
    { bot: "Bot D", industry: "Public Sector", duration: "04:15", status: "In Progress", time: "03:45 PM" },
    { bot: "Bot B", industry: "Finance", duration: "02:50", status: "Completed", time: "11:15 AM" },
    { bot: "Bot E", industry: "Healthcare", duration: "01:30", status: "Completed", time: "04:20 PM" },
    { bot: "Bot B", industry: "Finance", duration: "04:05", status: "In Progress", time: "07:00 PM" },
    { bot: "Bot D", industry: "Public Sector", duration: "05:10", status: "Completed", time: "08:30 PM" },
    { bot: "Bot E", industry: "Healthcare", duration: "02:40", status: "Completed", time: "09:15 PM" },
    { bot: "Bot C", industry: "Retail", duration: "03:55", status: "Completed", time: "07:45 PM" },
    { bot: "Bot F", industry: "Finance", duration: "01:50", status: "In Progress", time: "09:50 PM" },
    { bot: "Bot A", industry: "Healthcare", duration: "02:20", status: "Completed", time: "06:10 PM" },
  ];
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex-col" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Calls</h2>
  <div className="flex-1 overflow-y-auto min-h-0" style={{ maxHeight: 'calc(5 * 70px)', overflowY: 'auto' }}>
        {calls.map((call, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-50 cursor-pointer flex-shrink-0" style={{ height: '60px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="text-gray-700 font-medium">{`${call.bot} - ${call.industry}`}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    call.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {call.status}
                  </span>
                  <span className="text-sm text-slate-500">{call.time}</span>
                </div>
              </div>
              <span className="text-sm text-slate-500 ml-4">{call.duration}</span>
            </div>
            {index < calls.length - 1 && <Separator className="my-2 bg-gray-200" style={{ height: '2px' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}