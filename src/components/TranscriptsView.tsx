import React, { useState } from "react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

interface Transcript {
  id: string;
  created: string;
  duration: string;
  status: "unknown" | "answered" | "declined";
  quality: "low" | "medium" | "high";
  features: ("Recording" | "Speakers" | "Transcript" | "Sentiment" | "Intent")[];
  audioUrl?: string;
  rawData?: any;
}

interface TranscriptsViewProps {
  onViewDetails: (transcript: Transcript) => void;
}

export function TranscriptsView({ onViewDetails }: TranscriptsViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Sample transcript data
  const transcripts: Transcript[] = [
    {
      id: "TXN-001",
      created: "2024-10-09 14:30:25",
      duration: "3:45",
      status: "answered",
      quality: "high",
      features: ["Recording", "Speakers", "Transcript"],
      audioUrl: "/sample-audio.mp3",
      rawData: {
        id: "TXN-001",
        timestamp: "2024-10-09T14:30:25.000Z",
        caller: {
          phone: "+1234567890",
          location: "New York, NY"
        },
        transcript: "Hello, I need help with my account...",
        sentiment: "neutral",
        confidence: 0.95
      }
    },
    {
      id: "TXN-002",
      created: "2024-10-09 13:15:42",
      duration: "2:18",
      status: "declined",
      quality: "medium",
      features: ["Recording", "Transcript"],
      audioUrl: "/sample-audio-2.mp3",
      rawData: {
        id: "TXN-002",
        timestamp: "2024-10-09T13:15:42.000Z",
        caller: {
          phone: "+1987654321",
          location: "Los Angeles, CA"
        },
        transcript: "I'm calling about my order status...",
        sentiment: "frustrated",
        confidence: 0.87
      }
    },
    {
      id: "TXN-003",
      created: "2024-10-09 12:05:18",
      duration: "5:32",
      status: "answered",
      quality: "low",
      features: ["Recording", "Speakers"],
      audioUrl: "/sample-audio-3.mp3",
      rawData: {
        id: "TXN-003",
        timestamp: "2024-10-09T12:05:18.000Z",
        caller: {
          phone: "+1555123456",
          location: "Chicago, IL"
        },
        transcript: "Can you help me with technical support?",
        sentiment: "concerned",
        confidence: 0.72
      }
    },
    {
      id: "TXN-004",
      created: "2024-10-09 11:22:35",
      duration: "1:45",
      status: "unknown",
      quality: "high",
      features: ["Transcript"],
      audioUrl: "/sample-audio-4.mp3",
      rawData: {
        id: "TXN-004",
        timestamp: "2024-10-09T11:22:35.000Z",
        caller: {
          phone: "+1666789012",
          location: "Miami, FL"
        },
        transcript: "I have a question about billing...",
        sentiment: "neutral",
        confidence: 0.91
      }
    },
    {
      id: "TXN-005",
      created: "2024-10-09 10:45:12",
      duration: "4:15",
      status: "answered",
      quality: "medium",
      features: ["Recording", "Speakers", "Transcript"],
      audioUrl: "/sample-audio-5.mp3",
      rawData: {
        id: "TXN-005",
        timestamp: "2024-10-09T10:45:12.000Z",
        caller: {
          phone: "+1777890123",
          location: "Seattle, WA"
        },
        transcript: "I need to update my payment information...",
        sentiment: "satisfied",
        confidence: 0.88
      }
    },
    {
      id: "TXN-006",
      created: "2024-10-09 09:30:45",
      duration: "6:22",
      status: "answered",
      quality: "high",
      features: ["Recording", "Speakers", "Transcript", "Sentiment"],
      audioUrl: "/sample-audio-6.mp3",
      rawData: {
        id: "TXN-006",
        timestamp: "2024-10-09T09:30:45.000Z",
        caller: {
          phone: "+1888901234",
          location: "Denver, CO"
        },
        transcript: "I want to upgrade my service plan...",
        sentiment: "positive",
        confidence: 0.93
      }
    },
    {
      id: "TXN-007",
      created: "2024-10-09 08:15:33",
      duration: "2:58",
      status: "declined",
      quality: "low",
      features: ["Recording"],
      audioUrl: "/sample-audio-7.mp3",
      rawData: {
        id: "TXN-007",
        timestamp: "2024-10-09T08:15:33.000Z",
        caller: {
          phone: "+1999012345",
          location: "Boston, MA"
        },
        transcript: "Call declined by user",
        sentiment: "neutral",
        confidence: 0.65
      }
    },
    {
      id: "TXN-008",
      created: "2024-10-08 16:42:18",
      duration: "7:11",
      status: "answered",
      quality: "medium",
      features: ["Recording", "Speakers", "Transcript"],
      audioUrl: "/sample-audio-8.mp3",
      rawData: {
        id: "TXN-008",
        timestamp: "2024-10-08T16:42:18.000Z",
        caller: {
          phone: "+1101112131",
          location: "Austin, TX"
        },
        transcript: "I'm having trouble with my account access...",
        sentiment: "frustrated",
        confidence: 0.89
      }
    },
    {
      id: "TXN-009",
      created: "2024-10-08 15:28:07",
      duration: "3:33",
      status: "unknown",
      quality: "medium",
      features: ["Transcript"],
      audioUrl: "/sample-audio-9.mp3",
      rawData: {
        id: "TXN-009",
        timestamp: "2024-10-08T15:28:07.000Z",
        caller: {
          phone: "+1212131415",
          location: "Phoenix, AZ"
        },
        transcript: "Connection lost during call...",
        sentiment: "neutral",
        confidence: 0.78
      }
    },
    {
      id: "TXN-010",
      created: "2024-10-08 14:55:21",
      duration: "8:45",
      status: "answered",
      quality: "high",
      features: ["Recording", "Speakers", "Transcript", "Sentiment", "Intent"],
      audioUrl: "/sample-audio-10.mp3",
      rawData: {
        id: "TXN-010",
        timestamp: "2024-10-08T14:55:21.000Z",
        caller: {
          phone: "+1313141516",
          location: "Portland, OR"
        },
        transcript: "I need comprehensive support for my business account...",
        sentiment: "professional",
        confidence: 0.96
      }
    }
  ];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "answered": return { backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0', fontSize: '0.6rem' };
      case "declined": return { backgroundColor: '#fecaca', color: '#991b1b', borderColor: '#fca5a5', fontSize: '0.6rem' };
      case "unknown": return { backgroundColor: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1', fontSize: '0.6rem' };
      default: return { backgroundColor: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1', fontSize: '0.6rem' };
    }
  };

  const getQualityBadgeStyle = (quality: string) => {
    switch (quality) {
      case "high": return { backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0', fontSize: '0.6rem' };
      case "medium": return { backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#fde68a', fontSize: '0.6rem' };
      case "low": return { backgroundColor: '#fecaca', color: '#991b1b', borderColor: '#fca5a5', fontSize: '0.6rem' };
      default: return { backgroundColor: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1', fontSize: '0.6rem' };
    }
  };

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':');
    return `${minutes} mins ${seconds} secs`;
  };

  // Pagination logic
  const totalPages = Math.ceil(transcripts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTranscripts = transcripts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Call Transcripts</h1>
        <div className="text-sm text-slate-600">
          Total: {transcripts.length} transcripts | Page {currentPage} of {totalPages}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200">
              <TableHead className="w-28 px-6 py-4 text-left font-semibold text-slate-700">ID</TableHead>
              <TableHead className="w-44 px-6 py-4 text-left font-semibold text-slate-700">Created</TableHead>
              <TableHead className="w-28 px-6 py-4 text-left font-semibold text-slate-700">Duration</TableHead>
              <TableHead className="w-32 px-6 py-4 text-left font-semibold text-slate-700">Status</TableHead>
              <TableHead className="w-32 px-6 py-4 text-left font-semibold text-slate-700">Quality</TableHead>
              <TableHead className="w-52 px-6 py-4 text-left font-semibold text-slate-700">Features</TableHead>
              <TableHead className="w-36 px-6 py-4 text-left font-semibold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTranscripts.map((transcript) => (
              <>
                <TableRow key={transcript.id} className="hover:bg-slate-50 border-b border-slate-100 h-40" style={{ height: '50px' }}>
                  <TableCell className="px-6 py-8 font-medium text-slate-900">{transcript.id}</TableCell>
                  <TableCell className="px-6 py-8 text-slate-700">{transcript.created}</TableCell>
                  <TableCell className="px-6 py-8 text-slate-700 font-medium">{formatDuration(transcript.duration)}</TableCell>
                  <TableCell className="px-6 py-8">
                    <div 
                      className="inline-flex items-center px-3 py-1.5 rounded-full font-medium border"
                      style={getStatusBadgeStyle(transcript.status)}
                    >
                      {transcript.status.toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-8">
                    <div 
                      className="inline-flex items-center px-3 py-1.5 rounded-full font-medium border"
                      style={getQualityBadgeStyle(transcript.quality)}
                    >
                      {transcript.quality.toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-8">
                    <div className="flex flex-wrap gap-2 p-1">
                      {transcript.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="outline" 
                          className="text-xs border-slate-300 px-3 py-1.5 bg-slate-50 mx-1 my-0.5"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-8">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewDetails(transcript)}
                        className="border-slate-300 hover:bg-slate-100 px-3 py-2"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-slate-600">
          Showing {startIndex + 1} to {Math.min(endIndex, transcripts.length)} of {transcripts.length} entries
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="border-slate-300 hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className={`w-8 h-8 p-0 ${
                  currentPage === page 
                    ? "bg-slate-900 text-white" 
                    : "border-slate-300 hover:bg-slate-100"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="border-slate-300 hover:bg-slate-100"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}