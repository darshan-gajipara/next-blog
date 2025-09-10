"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Blog interface (Mongo style data)
export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: { $numberInt: string };
}

interface BlogContextType {
  blogData: Blog[] | null;
  setBlogData: React.Dispatch<React.SetStateAction<Blog[] | null>>;
  getAllData: () => void;
  addData: (value: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "__v">) => void;
  updateData: (id: string, value: Partial<Blog>) => void;
  deleteData: (id: string) => void;
}

// ✅ Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// ✅ Attach token from localStorage automatically
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogData, setBlogData] = useState<Blog[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const res = await api.get("/blogs/get");
      setBlogData(res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };


  const addData = async (value: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "__v">) => {
    try {
      await api.post("/blogs/add", value);
      router.push("/blogs");
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  const updateData = async (id: string, value: Partial<Blog>) => {
    try {
      await api.put(`/blogs/update/${id}`, value);
      router.push("/blogs");
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };


  const deleteData = (id: string) => {
    api
      .delete(`/blogs/delete/${id}`) // ✅ added missing slash
      .then(() => {
        getAllData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <BlogContext.Provider
      value={{ blogData, setBlogData, getAllData, addData, updateData, deleteData }}
    >
      {children}
    </BlogContext.Provider>
  );
}

// ✅ Custom hook
export function useBlogs() {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlogs must be used within BlogProvider");
  return context;
}
