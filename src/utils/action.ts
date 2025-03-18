"use server";

import { auth, signIn } from "@/auth";
import { revalidateTag } from "next/cache";
import { sendRequest } from "./api";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    console.log(">>> check r: ", r);
    return r;
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return {
        error: "Internal server error",
        code: 0,
      };
    }
  }
}

export const handleCreateUserAction = async (data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/postgres`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

export const handleUpdateUserAction = async (data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/postgres`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

export const handleDeleteUserAction = async (id: any) => {
  const session = await auth();
  console.log(id);
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/postgres/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-users");
  return res;
};

export const handleGetRoles = async () => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/roles`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  if (res.statusCode === 200 && Array.isArray(res.data)) {
    const items = res.data.map((role) => ({
      label: role.description, // Gán label từ description
      key: role.id, // Gán key từ name
    }));
    return items;
  }
  return [];
};

// export const handleGetCategories = async () => {
//   const session = await auth();
//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${session?.user?.access_token}`,
//     },
//   });

//   if (res.statusCode === 200 && Array.isArray(res.data)) {
//     const items = res.data.map((category) => ({
//       label: category.name, // Gán label từ name
//       key: category.id, // Gán key từ id
//     }));
//     return items;
//   }
//   return [];
// };

// export const handleCreateCategory = async (data: any) => {
//   const session = await auth();

//   // Create a copy of the data to modify
//   const requestData = { ...data };

//   // If parent_id is "none" or empty string, set it to null
//   if (requestData.parent_id === "none" || requestData.parent_id === "") {
//     requestData.parent_id = null;
//   }

//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${session?.user?.access_token}`,
//     },
//     body: {
//       name: requestData.name,
//       description: requestData.description,
//       slug: requestData.slug,
//       parent_id: requestData.parent_id, // Assuming the API accepts parent_ids as an array
//     },
//   });

//   revalidateTag("categories");
//   return res;
// };

// export const handleDeleteCategory = async (id: string) => {
//   const session = await auth();
//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/${id}`,
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${session?.user?.access_token}`,
//     },
//   });

//   revalidateTag("categories");
//   return res;
// };

export const handleGetCategories = async () => {
  const session = await auth();
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/all`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (res.statusCode === 200 && Array.isArray(res.data)) {
      const items = res.data.map((category) => ({
        label: category.name, // Gán label từ name
        key: category.id, // Gán key từ id
        description: category.description || "",
        slug: category.slug || "",
        parent_id: category.parent_id || null, // Get parent_id directly from the category
      }));
      return items;
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const handleGetCategoryRelationships = async () => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/relationships`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  if (res.statusCode === 200 && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export const handleCreateCategory = async (data: any) => {
  const session = await auth();

  // Create a copy of the data to modify
  const requestData = { ...data };

  console.log(">>> requestData: ", requestData);
  // If parent_id is "none" or empty string, set it to null
  if (requestData.parent_id === "none" || requestData.parent_id === "") {
    requestData.parent_id = null;
  } else {
    requestData.parent_id = requestData.parent_id;
  }

  // Keep the parent_id property as it's needed in the API

  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: requestData,
    });

    revalidateTag("categories");
    return res;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const handleDeleteCategory = async (id: string) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("categories");
  return res;
};



export const handleCreatePost = async (data: any) => {
  const session = await auth();

  const { title, content, description, excerpt, post_status, slug, categories_id, author_id, visibility, comment_status, ping_status, create_at } = data;

  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: {
        title,
        content,
        description,
        excerpt,
        post_status,
        slug,
        categories_id,
        author_id,
        visibility,
        comment_status,
        ping_status,
        create_at
      },
    });

    revalidateTag("categories");
    return res;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};



export const handleGetTags = async () => {
  const session = await auth();
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/post-tags`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (res.statusCode === 200 && Array.isArray(res.data)) {
      const items = res.data.map((tag) => ({
        label: tag.name, // Gán label từ name
        key: tag.id, // Gán key từ id
      }));
      return items;
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};