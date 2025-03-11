"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  GripVertical,
  Type,
  Image,
  Code,
  Video,
  List,
  Trash2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FileUploadArea } from "./file-upload-area";
import { useHasMounted } from "@/utils/customHook";

// Block types
type BlockType = "text" | "image" | "code" | "video" | "list";

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initial blocks
const initialBlocks: Block[] = [
  {
    id: generateId(),
    type: "text",
    content: "Start writing your post content here...",
  },
];

export function PostEditor() {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  // Handle drag end
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };

  // Add a new block
  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: "",
    };
    setBlocks([...blocks, newBlock]);
  };

  // Update block content
  const updateBlockContent = (id: string, content: string) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  // Delete a block
  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  // Handle file upload for image blocks
  const handleFileSelect = (id: string, file: File) => {
    console.log(`Selected file for block ${id}:`, file);
    // In a real app, you would upload this file to your server/cloud storage
  };

  // Handle file upload completion
  const handleFileUpload = (id: string, url: string) => {
    updateBlockContent(id, url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock("text")}
          className="flex items-center gap-1"
        >
          <Type className="h-4 w-4" />
          Text
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock("image")}
          className="flex items-center gap-1"
        >
          <Image className="h-4 w-4" />
          Image
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock("code")}
          className="flex items-center gap-1"
        >
          <Code className="h-4 w-4" />
          Code
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock("video")}
          className="flex items-center gap-1"
        >
          <Video className="h-4 w-4" />
          Video
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock("list")}
          className="flex items-center gap-1"
        >
          <List className="h-4 w-4" />
          List
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "border rounded-md p-3 bg-background",
                        snapshot.isDragging ? "opacity-70" : "",
                        activeBlockId === block.id ? "ring-2 ring-primary" : ""
                      )}
                      onClick={() => setActiveBlockId(block.id)}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-2 cursor-grab"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          {renderBlockContent(
                            block,
                            updateBlockContent,
                            (file) => handleFileSelect(block.id, file),
                            (url) => handleFileUpload(block.id, url)
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteBlock(block.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        variant="outline"
        className="w-full mt-4 border-dashed"
        onClick={() => addBlock("text")}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Block
      </Button>
    </div>
  );
}

// Render different block types
function renderBlockContent(
  block: Block,
  updateContent: (id: string, content: string) => void,
  onFileSelect: (file: File) => void,
  onFileUpload: (url: string) => void
) {
  switch (block.type) {
    case "text":
      return (
        <Textarea
          value={block.content}
          onChange={(e) => updateContent(block.id, e.target.value)}
          placeholder="Type your text here..."
          className="min-h-[100px] resize-none"
        />
      );
    case "image":
      return (
        <div className="space-y-2">
          <Input
            value={block.content}
            onChange={(e) => updateContent(block.id, e.target.value)}
            placeholder="Enter image URL or upload"
          />
          {block.content && !block.content.startsWith("blob:") && (
            <div className="mt-2 rounded-md overflow-hidden">
              <img
                src={block.content || "/placeholder.svg"}
                alt="Content"
                className="max-h-[200px] object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=200&width=400";
                }}
              />
            </div>
          )}
          <FileUploadArea
            onFileSelect={onFileSelect}
            onFileUpload={onFileUpload}
            value={
              block.content.startsWith("blob:") ? block.content : undefined
            }
            accept="image/*"
          />
        </div>
      );
    case "code":
      return (
        <Textarea
          value={block.content}
          onChange={(e) => updateContent(block.id, e.target.value)}
          placeholder="// Enter your code here"
          className="min-h-[150px] font-mono text-sm"
        />
      );
    case "video":
      return (
        <div className="space-y-2">
          <Input
            value={block.content}
            onChange={(e) => updateContent(block.id, e.target.value)}
            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
          />
          {block.content && !block.content.startsWith("blob:") ? (
            <div className="mt-2 aspect-video bg-muted rounded-md flex items-center justify-center">
              <Video className="h-10 w-10 text-muted-foreground" />
            </div>
          ) : (
            <FileUploadArea
              onFileSelect={onFileSelect}
              onFileUpload={onFileUpload}
              value={
                block.content.startsWith("blob:") ? block.content : undefined
              }
              accept="video/*"
            />
          )}
        </div>
      );
    case "list":
      return (
        <Textarea
          value={block.content}
          onChange={(e) => updateContent(block.id, e.target.value)}
          placeholder="- Item 1&#10;- Item 2&#10;- Item 3"
          className="min-h-[100px]"
        />
      );
    default:
      return null;
  }
}
