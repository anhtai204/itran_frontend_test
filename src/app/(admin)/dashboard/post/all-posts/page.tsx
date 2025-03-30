import { auth } from "@/auth";
import AllPostManage from "@/components/post/all-posts";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const AllPostsPage = async (props: IProps) => {
  const searchParams = await props?.searchParams;
  console.log(">>>searchParams: ", searchParams);
  let current = Number(searchParams?.current) || 1;
  const pageSize = (await Number(searchParams?.pageSize)) || 10;
  const session = await auth();

  let res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/custom`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-posts"] },
    },
  });

  if (res?.data?.results.length === 0 && current > 1) {
    current = 1;
    res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/custom`,
      method: "GET",
      queryParams: { current, pageSize },
      headers: { Authorization: `Bearer ${session?.user?.access_token}` },
      nextOption: { next: { tags: ["list-posts"] } },
    });
  }
  console.log(">>>res: ", res);

  return (
    <AllPostManage
      initialPosts={res?.data?.results ?? []}
      initialMeta={res?.data?.meta}
    />
  );
};

export default AllPostsPage;
