import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function QuickTest() {
  return (
  <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex-col"style={{ minHeight: 'calc(5 * 88px)', overflowY: 'auto' }}>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Test</h2>
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="space-y-4 h-full flex-col">
          <div className="flex-shrink-0">
            <Label htmlFor="bot-select" className="text-sm font-medium text-slate-700">Select Bot</Label>
            <Select>
              <SelectTrigger id="bot-select" className="border-slate-300 mt-1">
                <SelectValue placeholder="Choose a bot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bot-a">Bot A
                  <span className="block text-xs text-gray-500">Healthcare</span>
                </SelectItem>
                <SelectItem value="bot-b">Bot B
                  <span className="block text-xs text-gray-500">Finance</span>
                </SelectItem>
                <SelectItem value="bot-c">Bot C
                  <span className="block text-xs text-gray-500">Retail</span>
                </SelectItem>
                <SelectItem value="bot-d">Bot D
                  <span className="block text-xs text-gray-500">Technology</span>
                </SelectItem>
                <SelectItem value="bot-e">Bot E
                  <span className="block text-xs text-gray-500">Healthcare</span>
                </SelectItem>
                <SelectItem value="bot-f">Bot F
                  <span className="block text-xs text-gray-500">Finance</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-shrink-0">
            <Label htmlFor="phone-input" className="text-sm font-medium text-slate-700">Phone Number</Label>
            <Input 
              id="phone-input"
              placeholder="+1 (555) 000-0000"
              className="border-slate-300 focus:border-slate-500 mt-1"
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="test-message" className="text-sm font-medium text-slate-700">Test Message (Optional)</Label>
            <Textarea
              id="test-message"
              placeholder="Enter a custom message to test..."
              className="border-slate-300 focus:border-slate-500 mt-1 min-h-[100px] resize-none h-full"
            />
          </div>
          
          
          <div className="flex-shrink-0 space-y-2 mt-4">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
              Start Test Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}