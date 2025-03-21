import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BlogMain from "@/components/blog/blogs";
import { sendRequest } from "@/utils/api";
import { getUsers, handleGetCustomPost } from "@/utils/action";

interface IProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getCategoriesForPost = async () => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/each-post`,
    method: "GET",
  });

  if (res.statusCode === 200 && Array.isArray(res.data)) {
    return res.data;
  }
};

const BlogPage = async () => {
  const categories = (await getCategoriesForPost()) || [];
  // const posts = await fetchPosts();
  const posts = await handleGetCustomPost();
  return await (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      <Header />
      <BlogMain categories={categories} posts={posts} />
      <Footer />
    </div>
  );
};

export default BlogPage;
