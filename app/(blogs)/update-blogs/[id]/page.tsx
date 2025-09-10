"use client";

import axios from "axios";
import { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useBlogs } from "@/app/context/BlogsContext";

type BlogForm = {
    title: string;
    content: string;
    author: string;
};

export default function UpdateBlogsComponent({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const { updateData } = useBlogs();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<BlogForm>();

    useEffect(() => {
        if (!id) return;
        axios
            .get(`http://localhost:3000/api/blogs/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                const blog = res.data;
                setValue("title", blog.title);
                setValue("content", blog.content);
                setValue("author", blog.author);
            })
            .catch((err) => console.log(err));
    }, [id, setValue]);

    const onSubmit = (data: BlogForm) => {
        updateData(id,data)
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Update Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2 my-2">
                            <Label>Title</Label>
                            <Input {...register("title")} type="text" required />
                            {errors.title?.type === 'required' && <p role="alert" className='text-danger'> Title is required</p>}
                        </div>

                        <div className="grid gap-2 my-2">
                            <Label>Content</Label>
                            <Input {...register("content")} type="text" required />
                            {errors.content?.type === 'required' && <p role="alert" className='text-danger'> Content is required</p>}
                        </div>

                        <div className="grid gap-2 my-2">
                            <Label>Author</Label>
                            <Input {...register("author")} type="text" required />
                            {errors.author?.type === 'required' && <p role="alert" className='text-danger'> Author is required</p>}
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" className="mt-6">
                                Update
                            </Button>
                            <Link href={"/blogs"} className="mt-6"><Button>Back</Button></Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
