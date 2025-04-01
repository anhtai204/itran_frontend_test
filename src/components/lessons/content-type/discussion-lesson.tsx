"use client";

import type React from "react";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, ThumbsUp, Reply, User } from "lucide-react";

interface DiscussionLessonProps {
  content: {
    topic: string;
    participantCount: number;
    description: string;
  };
}

export default function DiscussionLesson({ content }: DiscussionLessonProps) {
  const [notes, setNotes] = useState("");
  const [newComment, setNewComment] = useState("");

  // Mock discussion data
  const mockDiscussion = [
    {
      id: 1,
      author: "Jane Smith",
      avatar: "/assets/images/avatar/ani.png?height=40&width=40",
      date: "2 days ago",
      content:
        "I think Context API is better for simpler applications where you don't need the extra features that Redux provides. It's built into React and requires less boilerplate.",
      likes: 12,
      replies: [
        {
          id: 101,
          author: "John Doe",
          avatar: "/assets/images/avatar/dog.jpg?height=40&width=40",
          date: "1 day ago",
          content:
            "I agree, but Redux DevTools can be really helpful for debugging complex state changes.",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      author: "Alex Johnson",
      avatar: "/assets/images/avatar/meme.jpg?height=40&width=40",
      date: "3 days ago",
      content:
        "Redux is still valuable for larger applications with complex state management needs. The middleware ecosystem is really powerful.",
      likes: 8,
      replies: [],
    },
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the comment to an API
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{content.topic}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {content.description}
          </p>

          <div className="space-y-6">
            {mockDiscussion.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={comment.avatar || "/assets/images/not_found.jpg"}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white mr-2">
                          {comment.author}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {comment.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center text-gray-500 hover:text-primary">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-primary">
                        <Reply className="h-4 w-4 mr-1" />
                        <span>Reply</span>
                      </button>
                    </div>

                    {comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-800 space-y-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start gap-3"
                          >
                            <img
                              src={
                                reply.avatar || "/assets/images/not_found.jpg"
                              }
                              alt={reply.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="flex items-center mb-1">
                                <span className="font-medium text-gray-900 dark:text-white mr-2">
                                  {reply.author}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {reply.date}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 mb-1">
                                {reply.content}
                              </p>
                              <button className="flex items-center text-sm text-gray-500 hover:text-primary">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmitComment} className="mt-8">
            <div className="flex items-start gap-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2">
                <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add to the discussion..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
