import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { Phone, PhoneCall } from "lucide-react";

interface StartCallDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function StartCallDialog({ open, onOpenChange }: StartCallDialogProps) {
    const [formData, setFormData] = useState({
        callType: "",
        selectedBot: "",
        phoneNumber: ""
    });

    const handleStartCall = () => {
        // Handle call start logic here
        console.log("Starting call:", formData);
        onOpenChange(false);
        // Reset form
        setFormData({
            callType: "",
            selectedBot: "",
            phoneNumber: ""
        });
    };

    return (
        <>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="callType">Call Type</Label>
                    <Select
                        value={formData.callType}
                        onValueChange={(value: any) => setFormData(prev => ({ ...prev, callType: value }))}
                    >
                        <SelectTrigger className="border-slate-300">
                            <SelectValue placeholder="Select call type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inbound">Inbound</SelectItem>
                            <SelectItem value="outbound">Outbound</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="selectedBot">Select Bot</Label>
                    <Select
                        value={formData.selectedBot}
                        onValueChange={(value: any) => setFormData(prev => ({ ...prev, selectedBot: value }))}
                    >
                        <SelectTrigger className="border-slate-300">
                            <SelectValue placeholder="Choose a bot" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bot-a">Bot A - Healthcare</SelectItem>
                            <SelectItem value="bot-b">Bot B - Finance</SelectItem>
                            <SelectItem value="bot-c">Bot C - Retail</SelectItem>
                            <SelectItem value="bot-d">Bot D - Public Sector</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="relative">
                        <Input
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            placeholder="+1 (555) 123-4567"
                            className="pl-10 border-slate-300 focus:border-slate-500"
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '24px' }} />

            <div className="flex justify-end space-x-2" style={{ justifyContent: 'end'}}>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <div style={{ width: '12px' }} />
                <Button
                    onClick={handleStartCall}
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Start Call
                </Button>
            </div>
        </>
    );
}