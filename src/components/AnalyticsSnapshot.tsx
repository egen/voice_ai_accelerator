import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export function AnalyticsSnapshot() {
  const data = [
    { name: "Mon", value: 20 },
    { name: "Tue", value: 45 },
    { name: "Wed", value: 28 },
    { name: "Thu", value: 38 },
    { name: "Fri", value: 52 },
    { name: "Sat", value: 35 },
    { name: "Sun", value: 42 }
  ];
  
  const stats = [
    { label: "Total Calls", value: "1,234", change: "+12%" },
    { label: "Avg Duration", value: "3:45", change: "+8%" },
    { label: "Success Rate", value: "94.2%", change: "+2.1%" },
  ];
  
  return (
  <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex-col"style={{ maxHeight: 'calc(5 * 88px)', overflowY: 'auto' }}>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Analytics Snapshot</h2>
      <div className="mb-6 flex-shrink-0" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gap: '16px',
        width: '100%'
      }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          ))}
      </div>
      <div style={{ height: '250px', width: '100%', marginTop: '16px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis hide />
            <Bar 
              dataKey="value" 
              fill="var(--chart-1)"
              radius={[4, 4, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}