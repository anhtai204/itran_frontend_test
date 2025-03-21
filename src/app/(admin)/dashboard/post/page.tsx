import { auth } from "@/auth";
import PostsPage from "@/components/post/admin.post";

const PostManage = async () => {

    const session  = await auth();

    return (
        <>
            <PostsPage session={session} />
        </>
    )
}

export default PostManage;