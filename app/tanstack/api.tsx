import AxiosApi from "@/lib/axios";

// ---- API functions ----
export async function fetchPosts({ page, limit, search }: { page: number; limit: number; search?: string }) {
    const res = await AxiosApi.get(`/blogs/get?page=${page}&limit=${limit}`);
    return res.data;
}

export async function createPost(newPost: { title: string; content: string; author:string }) {
    // const res = await fetch(API_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(newPost),
    // });
    await AxiosApi.post("/blogs/add", newPost);
    return newPost;
}

export async function updatePost(post: { id: string,title: string; content: string; author:string }) {
    // const res = await fetch(`${API_URL}/${post.id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(post),
    // });
    await AxiosApi.put(`/blogs/update/${post.id}`, post);
    return post;
}

export async function deletePost(id: string) {
    // await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await AxiosApi.delete(`/blogs/delete/${id}`);
    return id;
}