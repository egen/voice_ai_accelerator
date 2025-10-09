import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Volume2, Download } from "lucide-react";

interface Transcript {
  id: string;
  created: string;
  duration: string;
  status: "unknown" | "answered" | "declined";
  quality: "low" | "medium" | "high";
  features: ("Recording" | "Transcript")[];
  audioUrl?: string;
  rawData?: any;
}

interface TranscriptViewerProps {
  transcript: Transcript;
  onBack: () => void;
}

export function TranscriptViewer({ transcript, onBack }: TranscriptViewerProps) {
  const [activeTab, setActiveTab] = useState<"details" | "json">("details");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered": return "text-green-600";
      case "declined": return "text-red-600";
      case "unknown": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "high": return "text-green-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-red-600";
      default: return "text-gray-600";
    }
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Transcript Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transcript Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Transcript Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Transcript ID
                </label>
                <div className="text-sm text-slate-900 font-mono bg-slate-50 p-2 rounded">
                  {transcript.id}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Created At
                </label>
                <div className="text-sm text-slate-900">
                  {transcript.created}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Duration
                </label>
                <div className="text-sm text-slate-900">
                  {transcript.duration}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <div className={`text-sm font-medium ${getStatusColor(transcript.status)}`}>
                  {transcript.status.charAt(0).toUpperCase() + transcript.status.slice(1)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quality
                </label>
                <div className={`text-sm font-medium ${getQualityColor(transcript.quality)}`}>
                  {transcript.quality.charAt(0).toUpperCase() + transcript.quality.slice(1)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Features
                </label>
                <div className="text-sm text-slate-900">
                  {transcript.features.join(", ")}
                </div>
              </div>
            </div>
          </div>

          {/* Call Recording */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Call Recording</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <audio 
                    controls 
                    className="w-full h-12"
                    src={transcript.audioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-100"
                    title="Volume Control"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-100"
                    title="Download Recording"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                File: {transcript.audioUrl || "No audio file available"}
              </div>
            </div>
          </div>

          {/* Data View Tabs */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="border-b border-slate-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "details"
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Transcript Content
                </button>
                <button
                  onClick={() => setActiveTab("json")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "json"
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Raw JSON Data
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "details" ? (
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Conversation Transcript</h4>
                  <Textarea
                    value={transcript.rawData?.transcript || "No transcript available"}
                    readOnly
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Caller Information
                      </label>
                      <div className="text-sm text-slate-600">
                        Phone: {transcript.rawData?.caller?.phone || "Unknown"}<br/>
                        Location: {transcript.rawData?.caller?.location || "Unknown"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Analysis
                      </label>
                      <div className="text-sm text-slate-600">
                        Sentiment: {transcript.rawData?.sentiment || "Unknown"}<br/>
                        Confidence: {transcript.rawData?.confidence ? `${(transcript.rawData.confidence * 100).toFixed(1)}%` : "Unknown"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Raw JSON Data</h4>
                  <Textarea
                    value={JSON.stringify(transcript.rawData, null, 2)}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h4 className="font-medium text-slate-800 mb-3">Quick Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">ID:</span>
                <span className="font-mono text-slate-900">{transcript.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Duration:</span>
                <span className="text-slate-900">{transcript.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className={`font-medium ${getStatusColor(transcript.status)}`}>
                  {transcript.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Quality:</span>
                <span className={`font-medium ${getQualityColor(transcript.quality)}`}>
                  {transcript.quality}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h4 className="font-medium text-slate-800 mb-3">Available Features</h4>
            <div className="space-y-2">
              {transcript.features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h4 className="font-medium text-slate-800 mb-3">Actions</h4>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-slate-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Transcript
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-slate-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Audio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}