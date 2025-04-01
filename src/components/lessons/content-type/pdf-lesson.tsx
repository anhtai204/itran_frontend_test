"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  MessageSquare,
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";

interface PdfLessonProps {
  content: {
    pdfUrl: string;
    pageCount: number;
    description: string;
  };
}

export default function PdfLesson({ content }: PdfLessonProps) {
  const [notes, setNotes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 25);
    }
  };

  const handleNextPage = () => {
    if (currentPage < content.pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="text-sm">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
              aria-label="Previous page"
            >
              <RotateCw className="h-5 w-5 rotate-180" />
            </button>
            <span className="text-sm">
              {currentPage} / {content.pageCount}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === content.pageCount}
              className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
              aria-label="Next page"
            >
              <RotateCw className="h-5 w-5" />
            </button>
          </div>

          <a
            href={content.pdfUrl}
            download
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </a>
        </div>

        <div
          className="aspect-[4/3] flex items-center justify-center p-4"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* In a real app, this would be a PDF viewer component */}
          <div className="bg-white dark:bg-gray-900 w-full h-full flex items-center justify-center border shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">
              PDF Preview - Page {currentPage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
