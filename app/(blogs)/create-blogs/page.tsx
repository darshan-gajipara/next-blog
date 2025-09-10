"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useBlogs } from "@/app/context/BlogsContext";

type BlogForm = {
    title: string;
    content: string;
    author: string;
};

export default  function CreateBlogsComponet() {

    const { addData } = useBlogs();
    const { register, handleSubmit, formState: { errors } } = useForm<BlogForm>();

    const onSubmit = async (data: BlogForm) => {
        addData(data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
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
                                Create
                            </Button>
                            <Link href={"/blogs"} className="mt-6"><Button>Back</Button></Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
