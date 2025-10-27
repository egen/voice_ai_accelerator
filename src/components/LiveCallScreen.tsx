import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LiveCallScreenProps {
  onBack: () => void;
}

interface TranscriptMessage {
  id: number;
  speaker: 'Bot' | 'User';
  message: string;
  timestamp: string;
}

interface SentimentData {
  time: string;
  sentiment: number;
}

export default function LiveCallScreen({ onBack }: LiveCallScreenProps) {
  const [formData, setFormData] = useState({
    interactionType: "",
    customerName: "",
    selectedBot: "",
    phoneNumber: ""
  });

  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);

  // Ref for auto-scrolling to new messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const transcriptionContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to new messages
  useEffect(() => {
    if (transcriptionContainerRef.current) {
      transcriptionContainerRef.current.scrollTo({
        top: transcriptionContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [transcript]);

  useEffect(() => {
    if (!isCallActive || isCallEnded) return;

    const simulateTranscript = () => {
      const messages = [
        { speaker: 'Bot' as const, message: 'Hello! Thank you for calling. How can I assist you today?' },
        { speaker: 'User' as const, message: 'Hi there, I\'m having trouble with my recent order.' },
        { speaker: 'Bot' as const, message: 'I\'m sorry to hear that. I\'d be happy to help you with your order. Can you please provide me with your order number?' },
        { speaker: 'User' as const, message: 'Yes, it\'s ORD-12345. I placed it three days ago but haven\'t received any updates.' },
        { speaker: 'Bot' as const, message: 'Let me look that up for you right away. I can see your order here. It looks like there was a delay in shipping due to inventory.' },
        { speaker: 'User' as const, message: 'Oh no, when will it be shipped? I need it by Friday.' },
        { speaker: 'Bot' as const, message: 'I understand your concern. The good news is that your order is now ready and will be shipped today. You should receive it by Thursday.' },
        { speaker: 'User' as const, message: 'That\'s perfect! Thank you so much for checking on that.' },
        { speaker: 'Bot' as const, message: 'You\'re very welcome! I\'ve also upgraded your shipping to express at no additional cost as an apology for the delay.' },
        { speaker: 'User' as const, message: 'Wow, that\'s amazing customer service! Thank you so much.' },
        { speaker: 'Bot' as const, message: 'Is there anything else I can help you with today?' },
        { speaker: 'User' as const, message: 'No, that\'s everything. You\'ve been incredibly helpful.' }
      ];

      let messageIndex = 0;
      const interval = setInterval(() => {
        if (messageIndex < messages.length) {
          const newMessage: TranscriptMessage = {
            id: Date.now() + messageIndex,
            speaker: messages[messageIndex].speaker,
            message: messages[messageIndex].message,
            timestamp: new Date().toLocaleTimeString()
          };

          setTranscript(prev => [...prev, newMessage]);

          // ✅ Only update sentiment for the first 10 messages
          if (messageIndex < 10) {
            let sentiment: number;
            if (messageIndex < 3) {
              sentiment = 0.3 + Math.random() * 0.2;
            } else if (messageIndex < 6) {
              sentiment = 0.2 + Math.random() * 0.3;
            } else {
              sentiment = 0.7 + Math.random() * 0.3;
            }

            setSentimentData(prev => [
              ...prev,
              {
                time: new Date().toLocaleTimeString(),
                sentiment: sentiment
              }
            ]);
          }

          messageIndex++;
        } else {
          clearInterval(interval);
        }
      }, 2500);

      return () => clearInterval(interval);
    };

    const cleanup = simulateTranscript();
    return cleanup;
  }, [isCallActive, isCallEnded]);

  const handleStartCall = () => {
    setIsCallActive(true);
    setTranscript([]);
    setSentimentData([]);
  };

  const handleEndCall = () => {
    setIsCallEnded(true);
  };

  const handleBackToForm = () => {
    setIsCallActive(false);
    setIsCallEnded(false);
    setTranscript([]);
    setSentimentData([]);
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.6) return '#22c55e';
    if (sentiment > 0.3) return '#eab308';
    return '#ef4444';
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.6) return 'Positive';
    if (sentiment > 0.3) return 'Neutral';
    return 'Negative';
  };

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #f9fafb, white)' }}>
      {!isCallActive ? (
        <div
          className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg"
          style={{ padding: '2rem' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
            {/* Left - Back button */}
            <div className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-gray-100 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </div>

            {/* Center - Title */}
            <div className="flex-1 text-center">
              <h1 className="text-xl font-semibold" style={{ textAlign: 'center' }}>Start a Call</h1>
            </div>

            {/* Right - Empty spacer (keeps title truly centered) */}
            <div className="flex-1" />
          </div>

          {/* Form */}
          <div className="justify-center mb-4">
            <div className="w-96 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interactionType">Interaction Type</Label>
                <Select
                  value={formData.interactionType}
                  onValueChange={(value: string) =>
                    setFormData(prev => ({ ...prev, interactionType: value }))
                  }
                >
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select interaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone-call">Phone Call</SelectItem>
                    <SelectItem value="daily-room">Daily.co Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, customerName: e.target.value }))
                  }
                  placeholder="Customer name"
                  className="border-slate-300 focus:border-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="selectedBot">Selected Bot</Label>
                <Select
                  value={formData.selectedBot}
                  onValueChange={(value: string) =>
                    setFormData(prev => ({ ...prev, selectedBot: value }))
                  }
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
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))
                  }
                  placeholder="+1 (555) 123-4567"
                  className="border-slate-300 focus:border-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Start Call button */}
          <div className="flex justify-center">
            <Button
              onClick={handleStartCall}
              className="w-96 bg-green-600 hover:bg-green-700 text-white border-2 border-green-700 font-bold"
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                border: '2px solid #15803d',
                minHeight: '48px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '6px',
                padding: '12px 16px',
                cursor: 'pointer'
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              Start Call
            </Button>
          </div>
        </div>

      ) : (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* ROW 1: Call Active (left) | End Call & Mute (right) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToForm}
                disabled={!isCallEnded}
                className="hover:bg-gray-100"
                style={{ opacity: isCallEnded ? 1 : 0.5 }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#15803d', fontWeight: 500 }}>
                  {isCallEnded ? 'Call Ended' : 'Call Active'}
                </span>
                {!isCallEnded && (
                  <div style={{ width: '0.75rem', height: '0.75rem', backgroundColor: '#22c55e', borderRadius: '50%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={handleEndCall}
                disabled={isCallEnded}
                style={{
                  backgroundColor: isCallEnded ? '#9ca3af' : '#dc2626',
                  color: 'white',
                  border: isCallEnded ? '2px solid #6b7280' : '2px solid #b91c1c',
                  fontWeight: 'bold',
                  borderRadius: '6px',
                  cursor: isCallEnded ? 'not-allowed' : 'pointer'
                }}
              >
                <PhoneOff className="w-4 h-4 mr-2" style={{ color: 'white' }} />
                {isCallEnded ? 'Call Ended' : 'End Call'}
              </Button>
              <Button
                onClick={() => setIsMuted(!isMuted)}
                variant={isMuted ? "destructive" : "outline"}
                disabled={isCallEnded}
              >
                {isMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
            </div>
          </div>

          {/* ROW 2: Live Transcription (60%) | Sentiment Analysis (40%) */}
          <div style={{ padding: '1rem 1rem', backgroundColor: '#f9fafb' }}>
            <div style={{ display: 'flex', gap: '1.5rem', width: '100%' }}>
              {/* Live Transcription */}
              <div style={{ width: '60%' }}>
                <Card className="shadow-sm block">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Live Transcription</CardTitle>
                  </CardHeader>
                  <CardContent style={{ padding: 0 }}>
                    <div
                      ref={transcriptionContainerRef}
                      style={{
                        height: '400px',
                        overflowY: 'auto',
                        padding: '1rem'
                      }}
                    >
                      {transcript.length === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#6b7280' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '2rem', height: '2rem', border: '2px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 0.5rem' }}></div>
                            <p>Waiting for conversation to start...</p>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {transcript.map((message) => (
                            <div
                              key={message.id}
                              style={{ display: 'flex', justifyContent: message.speaker === 'Bot' ? 'flex-start' : 'flex-end' }}
                            >
                              <div
                                style={{
                                  maxWidth: '80%',
                                  padding: '0.75rem',
                                  borderRadius: '0.5rem',
                                  wordWrap: 'break-word',
                                  overflowWrap: 'break-word',
                                  backgroundColor: message.speaker === 'Bot' ? '#dbeafe' : '#f3f4f6',
                                  color: message.speaker === 'Bot' ? '#1e3a8a' : '#111827'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                                  <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>{message.speaker}</span>
                                  <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '0.5rem' }}>{message.timestamp}</span>
                                </div>
                                <p style={{ fontSize: '0.875rem' }}>{message.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sentiment Analysis */}
              <div style={{ width: '40%' }}>
                <Card className="shadow-sm block">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Sentiment Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={362}>
                      <LineChart data={sentimentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="time"
                          tick={{ fontSize: 10 }}
                          interval="preserveStartEnd"
                        />
                        <YAxis
                          domain={[0, 1]}
                          ticks={[0, 0.5, 1]}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip
                          formatter={(value: number) => [getSentimentLabel(value), "Sentiment"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="sentiment"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={(props) => {
                            const { cx, cy, payload } = props;
                            return (
                              <circle
                                cx={cx}
                                cy={cy}
                                r="4"
                                fill={getSentimentColor(payload.sentiment)}
                                stroke="white"
                                strokeWidth="2"
                              />
                            );
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    {sentimentData.length > 0 && (
                      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: '#4b5563', marginRight: '0.5rem' }}>Current:</span>
                          <span
                            style={{ fontWeight: 500, color: getSentimentColor(sentimentData[sentimentData.length - 1].sentiment) }}
                          >
                            {getSentimentLabel(sentimentData[sentimentData.length - 1].sentiment)}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: '#4b5563', marginRight: '0.5rem' }}>Average:</span>
                          <span
                            style={{
                              fontWeight: 500,
                              color: getSentimentColor(
                                sentimentData.reduce((acc, data) => acc + data.sentiment, 0) / sentimentData.length
                              )
                            }}
                          >
                            {getSentimentLabel(
                              sentimentData.reduce((acc, data) => acc + data.sentiment, 0) / sentimentData.length
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* ROW 3: Live Debug Info */}
          <div style={{ padding: '1rem 1rem', backgroundColor: 'white', borderTop: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Live Debug Info</h2>
            <div style={{ display: 'flex', gap: '1.5rem', width: '100%' }}>
              {/* System Information */}
              <div style={{ width: '50%' }}>
                <Card className="shadow-sm block">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">System Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Status:</span>
                        <span style={{ color: isCallEnded ? '#dc2626' : '#16a34a' }}>
                          {isCallEnded ? 'Disconnected' : 'Connected'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Transport:</span>
                        <span style={{ color: isCallEnded ? '#dc2626' : '#16a34a' }}>
                          {isCallEnded ? 'Disconnected' : 'WebRTC'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Transport State:</span>
                        <span style={{ color: isCallEnded ? '#dc2626' : '#16a34a' }}>
                          {isCallEnded ? 'disconnected' : 'stable'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Audio Quality:</span>
                        <span style={{ color: '#16a34a' }}>excellent</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Transcription Engine:</span>
                        <span style={{ color: '#2563eb' }}>Azure Speech Services</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Recognition Status:</span>
                        <span style={{ color: '#16a34a' }}>active</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Sentiment Engine:</span>
                        <span style={{ color: '#2563eb' }}>OpenAI GPT-4</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Processing Latency:</span>
                        <span style={{ color: '#ca8a04' }}>~200ms</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Messages Processed:</span>
                        <span style={{ color: '#2563eb' }}>{transcript.length}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Call Duration:</span>
                        <span style={{ color: '#4b5563' }}>{Math.floor((Date.now() % 100000) / 1000)}s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Events */}
              <div style={{ width: '50%' }}>
                <Card className="shadow-sm block">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Recent Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem' }}>
                      <div style={{ color: '#16a34a' }}>✓ Audio stream initialized</div>
                      <div style={{ color: '#16a34a' }}>✓ Transcription service connected</div>
                      <div style={{ color: '#16a34a' }}>✓ Sentiment analysis enabled</div>
                      <div style={{ color: '#2563eb' }}>→ Processing speech chunk #{transcript.length}</div>
                      {transcript.length > 0 && (
                        <div style={{ color: '#16a34a' }}>✓ Message transcribed successfully</div>
                      )}
                      {transcript.length > 5 && (
                        <div style={{ color: '#ea580c' }}>⚠ High processing load detected</div>
                      )}
                      {transcript.length > 8 && (
                        <div style={{ color: '#16a34a' }}>✓ Call quality optimized</div>
                      )}
                      {isCallEnded && (
                        <div style={{ color: '#dc2626' }}>✗ Call ended by user</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}