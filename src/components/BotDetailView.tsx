import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Edit, X, Check } from "lucide-react";

interface Bot {
  name: string;
  status: string;
  industry: string;
  model: string;
  prompts: string;
  description?: string;
  apiKey?: string;
  maxTokens?: number;
  temperature?: number;
}

interface BotDetailViewProps {
  bot: Bot;
  onBack: () => void;
  onUpdate?: (updatedBot: Bot) => void;
}

export function BotDetailView({ bot, onBack, onUpdate }: BotDetailViewProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Bot>({
    name: bot.name,
    status: bot.status,
    industry: bot.industry,
    model: bot.model,
    prompts: bot.prompts,
    description: bot.description || "Advanced AI assistant specialized in providing helpful and accurate responses.",
    apiKey: bot.apiKey || "sk-****************************",
    maxTokens: bot.maxTokens || 2048,
    temperature: bot.temperature || 0.7,
  });

  const handleInputChange = (field: keyof Bot, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setFormData({
      name: bot.name,
      status: bot.status,
      industry: bot.industry,
      model: bot.model,
      prompts: bot.prompts,
      description: bot.description || "Advanced AI assistant specialized in providing helpful and accurate responses.",
      apiKey: bot.apiKey || "sk-****************************",
      maxTokens: bot.maxTokens || 2048,
      temperature: bot.temperature || 0.7,
    });
    setIsEditMode(false);
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsEditMode(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>

        {/* Action Buttons */}
        {!isEditMode && (
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleEdit}
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2%' }}/>

      {/* Bot Details Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bot Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditMode}
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value: string) => handleInputChange('status', value)}
                disabled={!isEditMode}
              >
                <SelectTrigger className="border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Industry
              </label>
              <Select
                value={formData.industry}
                onValueChange={(value: string) => handleInputChange('industry', value)}
                disabled={!isEditMode}
              >
                <SelectTrigger className="border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Public Sector">Public Sector</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                AI Model
              </label>
              <Select
                value={formData.model}
                onValueChange={(value: string) => handleInputChange('model', value)}
                disabled={!isEditMode}
              >
                <SelectTrigger className="border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-live-2.5-flash">Gemini Live 2.5 Flash</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="llama-3">Llama 3</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Configuration</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                API Key
              </label>
              <Input
                type="password"
                value={formData.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                disabled={!isEditMode}
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Tokens
              </label>
              <Input
                type="number"
                value={formData.maxTokens}
                onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value) || 0)}
                disabled={!isEditMode}
                className="border-slate-300"
                min="1"
                max="4096"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Temperature ({formData.temperature})
              </label>
              <Input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                disabled={!isEditMode}
                className="border-slate-300"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Focused (0.0)</span>
                <span>Balanced (1.0)</span>
                <span>Creative (2.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={!isEditMode}
              className="border-slate-300"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              System Prompt
            </label>
            <Textarea
              value={formData.prompts}
              onChange={(e) => handleInputChange('prompts', e.target.value)}
              disabled={!isEditMode}
              className="border-slate-300"
              rows={4}
              placeholder="Enter the system prompt that defines how this bot should behave..."
            />
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Current Status</h3>
        <div className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: formData.status === 'active' ? '#22c55e' : '#ef4444',
            }}
          />
          <span className={`text-sm font-medium ${
            formData.status === 'active' ? 'text-green-700' : 'text-red-700'
          }`}>
            {formData.status === 'active' ? 'Active and Ready' : 'Inactive'}
          </span>
          <span className="text-sm text-slate-500">
            {formData.status === 'active' 
              ? 'This bot is currently active and can handle incoming requests.'
              : 'This bot is inactive and will not respond to requests.'
            }
          </span>
        </div>
      </div>

      {/* Bottom Action Buttons - Only show in edit mode */}
      {isEditMode && (
        <div className="flex mt-5 space-x-3 pt-6 border-t border-slate-200" style={{ marginTop: '2%', justifyContent: 'end' }}>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className="bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Check className="w-4 h-4 mr-2" />
            Update
          </Button>
        </div>
      )}
    </div>
  );
}