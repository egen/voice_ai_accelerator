import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, TrendingUp, TrendingDown, Clock, Users, Phone, Smile, Filter } from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";

interface ReportsViewProps {
    onBack: () => void;
}

export function ReportsView({ onBack }: ReportsViewProps) {
    const [selectedBot, setSelectedBot] = useState<string>("all");
    const [dateRange, setDateRange] = useState<string>("30days");

    // Bot profiles for filtering
    const botProfiles = [
        { id: "all", name: "All Bots" },
        { id: "customer-service", name: "Customer Service Bot" },
        { id: "sales", name: "Sales Bot" },
        { id: "support", name: "Technical Support Bot" },
        { id: "healthcare", name: "Healthcare Assistant" },
        { id: "finance", name: "Finance Bot" }
    ];

    // Sample data for charts
    const callVolumeData = [
        { name: 'Jan', calls: 45, duration: 120 },
        { name: 'Feb', calls: 52, duration: 135 },
        { name: 'Mar', calls: 48, duration: 128 },
        { name: 'Apr', calls: 61, duration: 145 },
        { name: 'May', calls: 58, duration: 142 },
        { name: 'Jun', calls: 67, duration: 155 },
        { name: 'Jul', calls: 72, duration: 168 },
        { name: 'Aug', calls: 68, duration: 162 },
        { name: 'Sep', calls: 75, duration: 175 },
        { name: 'Oct', calls: 82, duration: 185 },
        { name: 'Nov', calls: 78, duration: 178 },
        { name: 'Dec', calls: 89, duration: 195 }
    ];

    const sentimentData = [
        { name: 'Positive', value: 57, color: '#22c55e' },
        { name: 'Neutral', value: 31, color: '#f59e0b' },
        { name: 'Negative', value: 12, color: '#ef4444' }
    ];

    const hourlyCallsData = [
        { hour: '9AM', calls: 8, satisfaction: 4.2 },
        { hour: '10AM', calls: 12, satisfaction: 4.1 },
        { hour: '11AM', calls: 15, satisfaction: 4.3 },
        { hour: '12PM', calls: 18, satisfaction: 4.0 },
        { hour: '1PM', calls: 22, satisfaction: 3.9 },
        { hour: '2PM', calls: 28, satisfaction: 3.8 },
        { hour: '3PM', calls: 35, satisfaction: 3.7 },
        { hour: '4PM', calls: 32, satisfaction: 3.9 },
        { hour: '5PM', calls: 25, satisfaction: 4.1 },
        { hour: '6PM', calls: 15, satisfaction: 4.3 }
    ];

    const responseTimeData = [
        { day: 'Mon', time: 45 },
        { day: 'Tue', time: 38 },
        { day: 'Wed', time: 42 },
        { day: 'Thu', time: 35 },
        { day: 'Fri', time: 41 },
        { day: 'Sat', time: 48 },
        { day: 'Sun', time: 52 }
    ];

    // New data for stacked bar charts
    const sentimentByDurationData = [
        { duration: '0-2min', positive: 45, neutral: 25, negative: 8 },
        { duration: '2-5min', positive: 62, neutral: 32, negative: 15 },
        { duration: '5-10min', positive: 38, neutral: 28, negative: 22 },
        { duration: '10+min', positive: 28, neutral: 35, negative: 28 }
    ];

    const sentimentBySegmentData = [
        { segment: 'VIP', positive: 68, neutral: 22, negative: 8 },
        { segment: 'Regular', positive: 52, neutral: 33, negative: 15 },
        { segment: 'New', positive: 45, neutral: 38, negative: 18 },
        { segment: 'Enterprise', positive: 72, neutral: 20, negative: 6 },
        { segment: 'SMB', positive: 48, neutral: 35, negative: 17 }
    ];

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
                        Voice AI Analytics Reports
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-600">Filters:</span>
                    </div>

                    <Select value={selectedBot} onValueChange={setSelectedBot}>
                        <SelectTrigger className="w-48 border-slate-300">
                            <SelectValue placeholder="Select Bot Profile" />
                        </SelectTrigger>
                        <SelectContent>
                            {botProfiles.map((bot) => (
                                <SelectItem key={bot.id} value={bot.id}>
                                    {bot.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-32 border-slate-300">
                            <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="1year">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div style={{ height: '24px' }} />

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '20%' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600">Total Calls</p>
                            <p className="text-slate-900">1,247</p>
                        </div>
                        <Phone className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">+12%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '20%' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600">Avg Duration</p>
                            <p className="text-slate-900">4:32</p>
                        </div>
                        <Clock className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="flex items-center mt-2">
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-red-600">-5%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '20%' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600">Customer Sat..</p>
                            <p className="text-slate-900">4.2/5.0</p>
                        </div>
                        <Smile className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">+8%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '20%' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600">Active Bots</p>
                            <p className="text-slate-900">24</p>
                        </div>
                        <Users className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">+3</span>
                    </div>
                </div>
            </div>

            <div style={{ height: '12px' }} />

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Call Volume Trend */}
                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '50%' }}>
                    <h3 className="mb-4 text-slate-800">Call Volume Over Time</h3>
                    <div className="h-64" style={{ height: '275px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={callVolumeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="calls"
                                    stroke="#0f172a"
                                    fill="#0f172a"
                                    fillOpacity={0.1}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sentiment Distribution */}
                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '50%' }}>
                    <h3 className="mb-4 text-slate-800">Sentiment Distribution</h3>
                    <div className="h-64" style={{ height: '275px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${value}%`, 'Percentage']}
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px"
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        {sentimentData.map((item) => (
                            <div key={item.name} className="flex items-center">
                                <div
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-slate-600">{item.name}: {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ height: '12px' }} />
            
            <div className="grid grid-cols-2 gap-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Sentiment by Call Duration */}
                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '50%' }}>
                    <h3 className="mb-4 text-slate-800">Sentiment by Call Duration</h3>
                    <div className="h-64" style={{ height: '275px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sentimentByDurationData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="duration"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Bar dataKey="positive" stackId="sentiment" fill="#22c55e" radius={[0, 0, 0, 0]} barSize={50} />
                                <Bar dataKey="neutral" stackId="sentiment" fill="#f59e0b" radius={[0, 0, 0, 0]} barSize={50} />
                                <Bar dataKey="negative" stackId="sentiment" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2 bg-green-500" />
                            <span className="text-sm text-slate-600">Positive</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2 bg-yellow-500" />
                            <span className="text-sm text-slate-600">Neutral</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2 bg-red-500" />
                            <span className="text-sm text-slate-600">Negative</span>
                        </div>
                    </div>
                </div>

                {/* Sentiment by Customer Segment */}
                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '50%' }}>
                    <h3 className="mb-4 text-slate-800">Sentiment by Customer Segment</h3>
                    <div className="h-64" style={{ height: '275px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sentimentBySegmentData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="segment"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Bar dataKey="positive" stackId="sentiment" fill="#22c55e" radius={[0, 0, 0, 0]} barSize={50} />
                                <Bar dataKey="neutral" stackId="sentiment" fill="#f59e0b" radius={[0, 0, 0, 0]} barSize={50} />
                                <Bar dataKey="negative" stackId="sentiment" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2 bg-green-500" />
                            <span className="text-sm text-slate-600">Positive</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2 bg-yellow-500" />
                            <span className="text-sm text-slate-600">Neutral</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2 bg-red-500" />
                            <span className="text-sm text-slate-600">Negative</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '12px' }} />

            <div className="grid grid-cols-2 gap-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Hourly Call Pattern */}
                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '50%' }}>
                    <h3 className="mb-4 text-slate-800">Hourly Call Pattern</h3>
                    <div className="h-64" style={{ height: '275px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={hourlyCallsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="hour"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Bar
                                    dataKey="calls"
                                    fill="#0f172a"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Response Time Trend */}
                <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ width: '50%' }}>
                    <h3 className="mb-4 text-slate-800">Average Response Time (ms)</h3>
                    <div className="h-64" style={{ height: '275px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={responseTimeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="time"
                                    stroke="#0f172a"
                                    strokeWidth={3}
                                    dot={{ fill: "#0f172a", strokeWidth: 2, r: 6 }}
                                    activeDot={{ r: 8, fill: "#0f172a" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div style={{ height: '12px' }} />

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="bg-white rounded-lg border border-slate-200 p-4" style={{ width: '30%' }}>
                    <h4 className="text-slate-800 mb-2">Performance Insights</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Peak call time: 3:00 PM - 4:00 PM</li>
                        <li>• Fastest response: 35ms (Thursday)</li>
                        <li>• Highest satisfaction: 4.3/5.0</li>
                        <li>• Most active bot: Customer Service Bot</li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-4" style={{ width: '30%' }}>
                    <h4 className="text-slate-800 mb-2">Sentiment Insights</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                        <li>• <span className="text-green-600">VIP customers</span> show highest satisfaction (68%)</li>
                        <li>• <span className="text-yellow-600">Longer calls</span> tend to have mixed sentiment</li>
                        <li>• <span className="text-red-500">New customers</span> need more support</li>
                        <li>• Enterprise clients prefer quick resolutions</li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-4" style={{ width: '30%' }}>
                    <h4 className="text-slate-800 mb-2">Recommendations</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Scale bot capacity during peak hours</li>
                        <li>• Optimize response time for weekends</li>
                        <li>• Focus on reducing negative sentiment</li>
                        <li>• Deploy additional bots for high demand</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}