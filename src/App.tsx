import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { BotProfiles } from "./components/BotProfiles";
import { RecentCalls } from "./components/RecentCalls";
import { AnalyticsSnapshot } from "./components/AnalyticsSnapshot";
import { QuickTest } from "./components/QuickTest";
import { CreateBotDialog } from "./components/CreateBotDialog";
import { ReportsView } from "./components/ReportsView";
import { BotDetailView } from "./components/BotDetailView";
import { TranscriptsView } from "./components/TranscriptsView";
import { TranscriptViewer } from "./components/TranscriptViewer";
import LiveCallScreen from "./components/LiveCallScreen";
import { SimpleDialog } from "./components/SimpleDialog";
import { useState } from "react";
import { useEffect } from "react";
import { BotProfilesList } from "./components/BotProfilesList";

type ViewType = "dashboard" | "reports" | "bot-detail" | "transcripts" | "transcript-viewer" | "bot-profiles" | "live-call";

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

export default function App() {
  // Listen for Bot Profiles tab navigation
  useEffect(() => {
    const handler = () => setCurrentView("bot-profiles");
    window.addEventListener("navigate-bot-profiles", handler);
    return () => window.removeEventListener("navigate-bot-profiles", handler);
  }, []);

  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [createBotOpen, setCreateBotOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [selectedTranscript, setSelectedTranscript] = useState<any | null>(null);

  const handleCreateBot = () => {
    setCreateBotOpen(true);
  };

  const handleStartCall = () => {
    setCurrentView("live-call");
  };

  const handleViewReports = () => {
    setCurrentView("reports");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedBot(null);
    setSelectedTranscript(null);
  };

  const handleBotSelect = (bot: Bot) => {
    setSelectedBot(bot);
    setCurrentView("bot-detail");
  };

  const handleBotUpdate = (updatedBot: Bot) => {
    // Here you would typically update the bot in your data store
    console.log("Bot updated:", updatedBot);
    setSelectedBot(updatedBot);
  };

  const handleViewTranscripts = () => {
    setCurrentView("transcripts");
  };

  const handleTranscriptDetails = (transcript: any) => {
    setSelectedTranscript(transcript);
    setCurrentView("transcript-viewer");
  };

  const handleBackToTranscripts = () => {
    setCurrentView("transcripts");
    setSelectedTranscript(null);
  };

  function handleBotProfileView(botProfile: any) {
    // Convert BotProfile to Bot type
    const bot: Bot = {
      name: botProfile.name,
      status: botProfile.status,
      industry: botProfile.industry,
      model: botProfile.model,
      prompts: '',
      description: botProfile.description,
      apiKey: '',
      maxTokens: 0,
      temperature: 0.7,
    };
    handleBotSelect(bot);
  }



  return (
  <div className="min-h-screen bg-gray-100" style={{ overflow: 'hidden' }}>
    <Header onAnalyticsClick={handleViewReports} onTranscriptsClick={handleViewTranscripts} onDashboardClick={handleBackToDashboard} currentView={currentView} />
    <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
        <Sidebar 
          onCreateBot={handleCreateBot}
          onStartCall={handleStartCall}
          onViewReports={handleViewReports}
        />
        <main className="flex-1 p-6 overflow-y-auto" style={{ height: '90vh', marginTop: '56px' }}>
          {currentView === "dashboard" ? (
            // ...existing code...
            <div className="h-full">
              <div className="h-1/2 pb-3 flex gap-6">
                <div className="min-w-0" id="bot-profiles-section" style={{ width: 'calc(60% - 12px)', height: '100%' }}>
                  <BotProfiles onBotSelect={handleBotSelect} />
                </div>
                <div className="min-w-0" style={{ width: 'calc(40% - 12px)', height: '100%' }}>
                  <RecentCalls />
                </div>
              </div>
              {/* Spacer between rows */}
              <div style={{ margin: '25px 0' }}></div>
              <div className="h-1/2 pt-3 flex gap-6">
                <div className="min-w-0" id="analytics-section" style={{ width: 'calc(66.67% - 12px)' }}>
                  <AnalyticsSnapshot />
                </div>
                <div className="min-w-0" id="quick-test-section" style={{ width: 'calc(33.33% - 12px)' }}>
                  <QuickTest />
                </div>
              </div>
            </div>
          ) : currentView === "bot-profiles" ? (
            <BotProfilesList onViewBotDetail={handleBotProfileView} onBack={handleBackToDashboard} />
          ) : currentView === "reports" ? (
            <ReportsView onBack={handleBackToDashboard} />
          ) : currentView === "bot-detail" && selectedBot ? (
            <BotDetailView 
              bot={selectedBot} 
              onBack={handleBackToDashboard}
              onUpdate={handleBotUpdate}
            />
          ) : currentView === "transcripts" ? (
            <TranscriptsView onViewDetails={handleTranscriptDetails} onBack={handleBackToDashboard} />
          ) : currentView === "transcript-viewer" && selectedTranscript ? (
            <TranscriptViewer 
              transcript={selectedTranscript}
              onBack={handleBackToTranscripts}
            />
          ) : currentView === "live-call" ? (
            <LiveCallScreen 
              onBack={handleBackToDashboard}
            />
          ) : null}
        </main>
      </div>

      {/* Simple Dialogs */}
      <SimpleDialog open={createBotOpen} onClose={() => setCreateBotOpen(false)}>
        <CreateBotDialog 
          open={createBotOpen} 
          onOpenChange={setCreateBotOpen} 
        />
      </SimpleDialog>



      {/* Fixed header styles */}
      <style>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
        }
      `}</style>
    </div>
  );
}
