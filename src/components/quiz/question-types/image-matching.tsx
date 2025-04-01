"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

interface ImageMatchingProps {
  question: {
    id: string;
    text: string;
    items: Array<{
      id: string;
      leftImage: string;
      rightText: string;
    }>;
  };
  currentAnswers: Record<string, string> | null;
  onAnswerSelect: (answers: Record<string, string>) => void;
  showResult: boolean;
  correctAnswers?: Record<string, string>;
}

export function ImageMatching({
  question,
  currentAnswers,
  onAnswerSelect,
  showResult,
  correctAnswers,
}: ImageMatchingProps) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [leftItems, setLeftItems] = useState<
    Array<{ id: string; image: string }>
  >([]);
  const [rightItems, setRightItems] = useState<
    Array<{ id: string; content: string; matched?: boolean }>
  >([]);
  const [matchedPairs, setMatchedPairs] = useState<
    Array<{ leftId: string; rightId: string }>
  >([]);

  // Initialize from currentAnswers
  useEffect(() => {
    if (currentAnswers) {
      setMatches(currentAnswers);

      // Update matched pairs based on currentAnswers
      const pairs = Object.entries(currentAnswers).map(([leftId, rightId]) => ({
        leftId,
        rightId,
      }));
      setMatchedPairs(pairs);

      // Mark matched items
      setRightItems((prev) =>
        prev.map((item) => ({
          ...item,
          matched: Object.values(currentAnswers).includes(item.id),
        }))
      );
    }
  }, [currentAnswers]);

  // Initialize items
  useEffect(() => {
    // Set up left items
    setLeftItems(
      question.items.map((item) => ({
        id: item.id,
        image: item.leftImage,
      }))
    );

    // Set up right items and shuffle them
    const rightItemsData = question.items.map((item) => ({
      id: item.id,
      content: item.rightText,
      matched: false,
    }));
    setRightItems(shuffleArray([...rightItemsData]));
  }, [question.items]);

  // Helper function to shuffle array
  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || showResult) return;

    const { source, destination, draggableId } = result;

    // If dragging from right to left (matching)
    if (
      source.droppableId === "right-items" &&
      destination.droppableId.startsWith("left-drop-")
    ) {
      const leftId = destination.droppableId.replace("left-drop-", "");
      const rightId = draggableId;

      // Update matches
      const newMatches = { ...matches, [leftId]: rightId };
      setMatches(newMatches);
      onAnswerSelect(newMatches);

      // Update matched pairs
      const newMatchedPairs = [
        ...matchedPairs.filter((pair) => pair.leftId !== leftId),
        { leftId, rightId },
      ];
      setMatchedPairs(newMatchedPairs);

      // Mark right item as matched
      setRightItems((prev) =>
        prev.map((item) =>
          item.id === rightId ? { ...item, matched: true } : item
        )
      );
    }
    // If reordering within the right column
    else if (
      source.droppableId === "right-items" &&
      destination.droppableId === "right-items"
    ) {
      const reorderedItems = Array.from(rightItems);
      const [removed] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, removed);

      setRightItems(reorderedItems);
    }
    // If dragging from a matched position back to right column (unmatching)
    else if (
      source.droppableId.startsWith("left-drop-") &&
      destination.droppableId === "right-items"
    ) {
      const leftId = source.droppableId.replace("left-drop-", "");
      const rightId = draggableId.replace("matched-", "");

      // Remove from matches
      const newMatches = { ...matches };
      delete newMatches[leftId];
      setMatches(newMatches);
      onAnswerSelect(newMatches);

      // Update matched pairs
      const newMatchedPairs = matchedPairs.filter(
        (pair) => pair.leftId !== leftId
      );
      setMatchedPairs(newMatchedPairs);

      // Mark right item as unmatched
      setRightItems((prev) =>
        prev.map((item) =>
          item.id === rightId ? { ...item, matched: false } : item
        )
      );
    }
  };

  const resetMatches = () => {
    setMatches({});
    setMatchedPairs([]);
    onAnswerSelect({});

    // Reset matched status
    setRightItems((prev) => prev.map((item) => ({ ...item, matched: false })));
  };

  const isCorrectMatch = (leftId: string) => {
    if (!showResult || !correctAnswers) return false;

    const rightId = matches[leftId];
    const correctRightId = correctAnswers[leftId];

    return rightId === correctRightId;
  };

  const getMatchedRightItem = (leftId: string) => {
    const rightId = matches[leftId];
    return rightItems.find((item) => item.id === rightId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="mt-4">
        <div className="items-start">
          {/* Left column (images) */}
          <div className="w-full">
            {leftItems.map((leftItem) => {
              const isMatched = leftItem.id in matches;
              const matchedRightItem = getMatchedRightItem(leftItem.id);
              const isCorrect = showResult && isCorrectMatch(leftItem.id);

              return (
                <div
                  key={`left-${leftItem.id}`}
                  className={"relative inline-block w-1/2 p-2"}
                >
                  <div
                    className={cn(
                      "rounded-md border border-gray-200 dark:border-gray-700 transition-colors",
                      isMatched &&
                        !showResult &&
                        "bg-primary/10 border-primary/30",
                      showResult &&
                        isCorrect &&
                        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900",
                      showResult &&
                        isMatched &&
                        !isCorrect &&
                        "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900"
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-32">
                        <Image
                          src={
                            leftItem.image ||
                            "/assets/images/not_found.jpg?height=128&width=256"
                          }
                          alt="Match item"
                          fill
                          className="object-contain"
                        />
                      </div>

                      {isMatched ? (
                        <div className="flex items-center mt-2">
                          <span className="text-sm font-medium">
                            {matchedRightItem?.content}
                          </span>
                          {showResult &&
                            (isCorrect ? (
                              <Check className="h-4 w-4 ml-2 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 ml-2 text-red-500" />
                            ))}
                        </div>
                      ) : (
                        <div className="flex items-center mt-2 text-gray-400 dark:text-gray-500 text-sm italic">
                          <span className="text-sm">Kéo thả vào đây</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!isMatched && !showResult && (
                    <Droppable
                      droppableId={`left-drop-${leftItem.id}`}
                      direction="vertical"
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            "absolute inset-0 rounded-md border-2 border-dashed m-1",
                            snapshot.isDraggingOver
                              ? "border-primary bg-primary/5"
                              : "border-dashed border-gray-400 dark:border-gray-500"
                          )}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}

                  {isMatched && !showResult && (
                    <Droppable
                      droppableId={`left-drop-${leftItem.id}`}
                      direction="vertical"
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="absolute inset-0 opacity-0"
                        >
                          <Draggable
                            draggableId={`matched-${matches[leftItem.id]}`}
                            index={0}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="absolute inset-0 opacity-0"
                              />
                            )}
                          </Draggable>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right column (text) */}
          {!showResult && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Các lựa chọn:</h4>
              <Droppable droppableId="right-items" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-wrap gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-md min-h-[60px]"
                  >
                    {rightItems.map(
                      (item, index) =>
                        !item.matched && (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            isDragDisabled={showResult}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cn(
                                  "p-3 rounded-md border border-gray-200 dark:border-gray-700 transition-colors",
                                  snapshot.isDragging &&
                                    "ring-2 ring-primary shadow-lg",
                                  !showResult &&
                                    "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-grab"
                                )}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>

        {!showResult && (
          <div className="mt-4 flex justify-end">
            <div className="italic text-sm text-gray-500 dark:text-gray-400 w-full">
              Hướng dẫn: Kéo thả <b>các lựa chọn</b> vào{" "}
              <b>từng ô ở phía trên</b>.
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetMatches}
              disabled={Object.keys(matches).length === 0}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm lại
            </Button>
          </div>
        )}

        {showResult && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <h4 className="font-medium mb-2">Đáp án đúng:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.items.map((item) => {
                const correctRightItem = question.items.find(
                  (i) => i.id === correctAnswers?.[item.id]
                );

                return (
                  <div key={`correct-${item.id}`} className="flex items-center">
                    <div className="relative w-12 h-12 mr-2">
                      <Image
                        src={
                          item.leftImage ||
                          "/assets/images/not_found.jpg?height=48&width=48"
                        }
                        alt="Item"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
                    <span>{correctRightItem?.rightText || "?"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
