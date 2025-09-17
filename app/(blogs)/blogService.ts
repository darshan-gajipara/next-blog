import AxiosApi from "@/lib/axios";
import { Blog, BlogApiResponse } from "../store/useBlogsStore";

export async function fetchBlogs(quarry:string,page:number,limit:number): Promise<BlogApiResponse> {
    const res = await AxiosApi.get(`/blogs/get?page=${page}&limit=${limit}&search=${quarry}`);
    return res.data;
}

export async function addBlog(
    value: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "__v">
): Promise<Blog[]> {
    await AxiosApi.post("/blogs/add", value);
    const res = await AxiosApi.get("/blogs/get");
    return res.data;
}

export async function updateBlog(
    id: string,
    value: Partial<Blog>
): Promise<Blog[]> {
    await AxiosApi.put(`/blogs/update/${id}`, value);
    const res = await AxiosApi.get("/blogs/get");
    return res.data;
}

export async function deleteBlog(id: string): Promise<Blog[]> {
    await AxiosApi.delete(`/blogs/delete/${id}`);
    const res = await AxiosApi.get("/blogs/get");
    return res.data;
}
