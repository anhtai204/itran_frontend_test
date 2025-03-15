"use client";

import React, { useEffect, useState } from "react";
import { PostEditor } from "@/components/post-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  CalendarIcon,
  Globe,
  Lock,
  Users,
  MessageSquare,
  Bell,
} from "lucide-react";
import { FileUploadArea } from "@/components/file-upload-area";
import { useHasMounted } from "@/utils/customHook";
import { handleGetCategories } from "@/utils/action";
import { MultiSelect } from "./ui/multi-select";

export default function PostsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  // const [categories, setCategories] = useState({});
  const [visibility, setVisibility] = useState("public");
  const [isPublished, setIsPublished] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const hasMounted = useHasMounted();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const items = await handleGetCategories();
        if (Array.isArray(items)) {
          // Transform the data to match the MultiSelect Option type
          const formattedCategories = items.map((item) => ({
            label: item.label,
            value: item.key,
          }));
          setCategories(formattedCategories);
        } else {
          console.error("Categories data is not an array:", items);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  if (!hasMounted) return <></>;

  const handleFeaturedImageSelect = (file: File) => {
    console.log("Selected featured image:", file);
    // In a real app, you would upload this file to your server/cloud storage
  };

  const handleFeaturedImageUpload = (url: string) => {
    setFeaturedImage(url);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 lg:ml-20">
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="dark:text-white">
                Save Draft
              </Button>
              <Button>Publish</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter post description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Enter post excerpt (used for social media and listings)"
                        rows={2}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        A short summary of your post. If left empty, the
                        description will be used.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Blocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <PostEditor
                    title={title}
                    description={description}
                    excerpt={excerpt}
                    featuredImage={featuredImage}
                    allowComments={allowComments}
                    receiveNotifications={receiveNotifications}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {/* <Label htmlFor="category">Category</Label>
                    <Select value={categories} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                        <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                          {category.name}
                          </SelectItem>
                        ))}
                        </SelectContent>
                    </Select> */}
                    <Label htmlFor="categories">Categories</Label>
                    <MultiSelect
                      options={categories}
                      selected={selectedCategories}
                      onChange={setSelectedCategories}
                      placeholder="Select categories"
                    />
                    <p className="text-xs text-muted-foreground">
                      Select one or more categories for your post.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={
                          visibility === "public" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setVisibility("public")}
                        className="flex items-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        Public
                      </Button>
                      <Button
                        variant={
                          visibility === "private" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setVisibility("private")}
                        className="flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        Private
                      </Button>
                      <Button
                        variant={
                          visibility === "restricted" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setVisibility("restricted")}
                        className="flex items-center gap-2"
                      >
                        <Users className="h-4 w-4" />
                        Restricted
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Published</Label>
                    <Switch
                      id="published"
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="comments">Allow Comments</Label>
                    </div>
                    <Switch
                      id="comments"
                      checked={allowComments}
                      onCheckedChange={setAllowComments}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="notifications">
                        Receive Notifications
                      </Label>
                    </div>
                    <Switch
                      id="notifications"
                      checked={receiveNotifications}
                      onCheckedChange={setReceiveNotifications}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        onClick={() => setShowCalendar(!showCalendar)}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>
                          {date ? date.toDateString() : "Pick a date"}
                        </span>
                      </Button>
                      {showCalendar && (
                        <div className="absolute z-10 mt-2">
                          {/* <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            setShowCalendar(false);
                          }}
                          className="rounded-md border"
                          /> */}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Add tags separated by commas"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Slug</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Add slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUploadArea
                    onFileSelect={handleFeaturedImageSelect}
                    onFileUpload={handleFeaturedImageUpload}
                    value={featuredImage}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
