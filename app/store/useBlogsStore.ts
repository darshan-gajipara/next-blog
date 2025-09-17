import { create } from "zustand";
import {
  fetchBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from "../(blogs)/blogService";
import { toast } from "sonner"

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: { $numberInt: string };
}

export interface BlogApiResponse {
  data: Blog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface BlogStore {
  blogData: Blog[] | null;
  blogResponse : BlogApiResponse | null;
  loading: boolean;
  getAllData: (quarry?: string,page?:number,limit?:number) => Promise<void>;
  addData: (value: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "__v">) => Promise<void>;
  updateData: (id: string, value: Partial<Blog>) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
}

export const useBlogsStore = create<BlogStore>((set) => ({
  blogData: null,
  loading: false,
  blogResponse:null,

  getAllData: async (quarry?:string,page?:number,limit?:number) => {
    // set({ loading: true });
    try {
      const blogs = await fetchBlogs((quarry || ''), (page || 1),(limit || 2));
      set({ blogResponse: blogs });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      set({ loading: false });
    }
  },

  addData: async (value) => {
    set({ loading: true });
    try {
      const blogs = await addBlog(value);
      set({ blogData: blogs });
    } catch (err) {
      console.error("Error adding blog:", err);
    } finally {
      set({ loading: false });
      toast.success("Blog has been created");
    }
  },

  updateData: async (id, value) => {
    set({ loading: true });
    try {
      const blogs = await updateBlog(id, value);
      set({ blogData: blogs });
    } catch (err) {
      console.error("Error updating blog:", err);
    } finally {
      set({ loading: false });
      toast.success("Blog has been updated successfully");
    }
  },

  deleteData: async (id) => {
    set({ loading: true });
    try {
      const blogs = await deleteBlog(id);
      set({ blogData: blogs });
    } catch (err) {
      console.error("Error deleting blog:", err);
    } finally {
      set({ loading: false });
      toast.success("Blog has been deleted");
    }
  },
}));
