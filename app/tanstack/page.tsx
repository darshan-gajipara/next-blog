"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Blog } from "../store/useBlogsStore";
import { createPost, deletePost, fetchPosts, updatePost } from "./api";

// Fake API endpoints
// const API_URL = "https://jsonplaceholder.typicode.com/posts";

// type Post = {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// };

// ---- Component ----
export default function CrudPage() {
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    // READ
    const { data: posts, isLoading } = useQuery({
        queryKey: ["posts", page, limit],
        queryFn: () => fetchPosts({ page, limit }),
        // keepPreviousData: true,
    });

    // CREATE
    const createMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] }); // refetch posts
        },
    });

    // UPDATE
    const updateMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    const [newTitle, setNewTitle] = useState("");

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">CRUD with TanStack Query</h1>

            {/* CREATE */}
            <div className="mt-4">
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter new post title"
                    className="border p-2 mr-2"
                />
                <button
                    onClick={() => {
                        createMutation.mutate({ title: newTitle, content: `${newTitle} content`, author:`${newTitle} author` });
                        setNewTitle("");
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Post
                </button>
            </div>

            {/* READ + UPDATE + DELETE */}
            <ul className="mt-6 space-y-2">
                {posts.data.map((post: Blog) => (
                    <li
                        key={post?._id}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <span>{post?.title}</span>
                        <div className="space-x-2">
              <button
                onClick={() =>
                  updateMutation.mutate({ id: post._id, title: post.title + 'Uptated', content: post.content, author:post.author })
                }
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => deleteMutation.mutate(post._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>Page {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-gray-300 px-3 py-1 rounded"
                >
                    Next
                </button>

                <select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1); // reset to first page when limit changes
                    }}
                    className="border px-2 py-1 rounded"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
}
