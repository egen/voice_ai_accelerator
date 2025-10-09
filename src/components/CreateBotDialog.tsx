import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";

interface CreateBotDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues?: {
        industryValue?: string;
        name?: string;
        industry?: string;
        model?: string;
        prompts?: string;
        status?: string;
    };
}

export function CreateBotDialog({ open, onOpenChange, initialValues }: CreateBotDialogProps) {
    const [formData, setFormData] = useState({
        botName: "",
        industry: "",
        model: "",
        prompt: "",
        isActive: true
    });

    // Fill form when initialValues change
    useEffect(() => {
        if (open && initialValues) {
            setFormData({
                botName: initialValues.name || "",
                industry: initialValues.industry || "",
                model: initialValues.model || "",
                prompt: initialValues.prompts || "",
                isActive: initialValues.status === "active"
            });
        } else if (open && !initialValues) {
            setFormData({
                botName: "",
                industry: "",
                model: "",
                prompt: "",
                isActive: true
            });
        }
    }, [open, initialValues]);

    const isEditMode = !!initialValues;
    const handleSubmit = () => {
        // Handle bot creation or update logic here
        if (isEditMode) {
            console.log("Updating bot:", formData);
        } else {
            console.log("Creating bot:", formData);
        }
        onOpenChange(false);
        // Reset form
        setFormData({
            botName: "",
            industry: "",
            model: "",
            prompt: "",
            isActive: true
        });
    };

    return (
        <>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="botName">Bot Name</Label>
                    <Input
                        id="botName"
                        value={formData.botName}
                        onChange={(e) => setFormData(prev => ({ ...prev, botName: e.target.value }))}
                        placeholder="Enter bot name"
                        className="border-slate-300 focus:border-slate-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                        value={formData.industry}
                        onValueChange={(value: any) => setFormData(prev => ({ ...prev, industry: value }))}
                    >
                        <SelectTrigger className="border-slate-300">
                            <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Public Sector">Public Sector</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Select
                        value={formData.model}
                        onValueChange={(value: any) => setFormData(prev => ({ ...prev, model: value }))}
                    >
                        <SelectTrigger className="border-slate-300">
                            <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gemini-live-2.5-flash">Gemini Live 2.5</SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="llama-3">Llama 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Textarea
                        id="prompt"
                        value={formData.prompt}
                        onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                        placeholder="Enter bot prompt and instructions..."
                        className="border-slate-300 focus:border-slate-500 min-h-[100px]"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Label htmlFor="isActive">Status</Label>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600">Inactive</span>
                        <label htmlFor="isActive" style={{ display: 'inline-block', position: 'relative', width: '40px', height: '24px' }}>
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                style={{ opacity: 0, width: '40px', height: '24px', margin: 0, position: 'absolute', left: 0, top: 0, cursor: 'pointer' }}
                            />
                            <span style={{
                                display: 'block',
                                width: '40px',
                                height: '24px',
                                background: formData.isActive ? '#059669' : '#d1d5db',
                                borderRadius: '12px',
                                transition: 'background 0.2s',
                                position: 'relative'
                            }}>
                                <span style={{
                                    display: 'block',
                                    width: '18px',
                                    height: '18px',
                                    background: '#fff',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '3px',
                                    left: formData.isActive ? '18px' : '3px',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                    transition: 'left 0.2s'
                                }} />
                            </span>
                        </label>
                        <span className="text-sm text-slate-600">Active</span>
                    </div>
                </div>
            </div>

            <div style={{ height: '24px' }} />

            <div className="flex justify-end space-x-2" style={{ justifyContent: 'end' }}>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <div style={{ width: '12px' }} />
                <Button
                    onClick={handleSubmit}
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                    {isEditMode ? "Update Bot" : "Create Bot"}
                </Button>
            </div>
        </>
    );
}