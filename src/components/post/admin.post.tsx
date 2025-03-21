"use client";

import { useState, useEffect } from "react";
import { PostEditor } from "@/components/post/post-editor";
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
import { FileUploadArea } from "@/components/post/file-upload-area";
import { handleGetCategories, handleCreatePost } from "@/utils/action";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";

export default function PostsPage(props: any) {

  const { session} = props;

  // Đảm bảo tất cả các hooks được gọi ở cùng một thứ tự trong mỗi lần render
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [visibility, setVisibility] = useState("public");
  const [isPublished, setIsPublished] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([
    {
      id: `block-initial-${Date.now()}`,
      type: "text",
      content: "",
    },
  ]);

  // Xử lý client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories
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

  // Generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleFeaturedImageSelect = (file: File) => {
    console.log("Selected featured image:", file);
    // In a real app, you would upload this file to your server/cloud storage
  };

  const handleFeaturedImageUpload = (url: string) => {
    setFeaturedImage(url);
  };

  const handleSubmit = async (isDraft = false) => {
    // Validate required fields
    if (!title) {
      // Show error message
      toast("Title is required");
      return;
    }

    // Prepare post data
    const postData = {
      title: title,
      content: JSON.stringify(blocks[0].content),
      description,
      excerpt: excerpt || description,
      post_status: isDraft ? "draft" : isPublished ? "published" : "draft",
      slug,
      categories_id: selectedCategories, // This will be an array of category IDs
      author_id: session?.user?.id,
      // featured_image: featuredImage,
      visibility: visibility,
      comment_status: allowComments,
      ping_status: receiveNotifications,
      // tags: tags
      //   .split(",")
      //   .map((tag) => tag.trim())
      //   .filter(Boolean),
      created_at: isPublished ? new Date().toISOString() : null,
    };

    console.log('>>postData: ', postData);

    try {
      const response = await handleCreatePost(postData)
      if (response.statusCode === 201) {
        // Show success message and redirect
        console.log("Post created successfully:", response.data)
        toast("Post created successfully!");
        // Redirect to post list or view
      } else {
        // Show error message
        toast("Post already exist or failed to create");
      }
    } catch (error) {
      console.error("Error creating post:", error)
    }
  };

  // Render loading state if not mounted
  if (!mounted) {
    return <div className="p-6">Loading post editor...</div>;
  }

  // const showContent = () => {
  //   console.log(">>>title: ", title);
  //   console.log(">>>description: ", description);
  //   console.log(">>>excerpt: ", excerpt);
  //   console.log(">>>visibility: ", visibility);
  //   console.log(">>>isPublished: ", isPublished);
  //   console.log(">>>allowComments: ", allowComments);
  //   console.log(">>>receiveNotifications: ", receiveNotifications);
  //   console.log(">>>tags: ", tags);
  //   console.log(">>>slug: ", slug);
  //   console.log(">>>date: ", date);
  //   console.log(">>>featured_image: ", featuredImage);
  //   console.log(">>>block: ", blocks[0].content);
  // };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 lg:ml-20">
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="dark:text-white" onClick={() => handleSubmit(true)}>
              {/* <Button
                variant="outline"
                className="dark:text-white"
                onClick={() => showContent()}
              > */}
                Save Draft
              </Button>
              <Button onClick={() => handleSubmit(false)}>Publish</Button>
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
                    blocks={blocks}
                    setBlocks={setBlocks}
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
                          {/* Calendar component would go here */}
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
                  <p className="text-xs text-muted-foreground mt-2">
                    Tags help users find your content. Separate multiple tags
                    with commas.
                  </p>
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
                  <p className="text-xs text-muted-foreground mt-2">
                    The slug is the URL-friendly version of the title. It is
                    usually all lowercase and contains only letters, numbers,
                    and hyphens.
                  </p>
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
