"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function ReadBlogsComponent({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const [blogData, setData] = useState<Blog | null>(null);

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
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);



    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Details Of Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2 my-2">
                        <div className="flex ml-2">Title : <Label className="ml-2">{blogData?.title}</Label></div>
                    </div>

                    <div className="grid gap-2 my-2">
                        <div className="flex ml-2">Content : <Label className="ml-2">{blogData?.content}</Label></div>
                    </div>

                    <div className="grid gap-2 my-2">
                        <div className="flex ml-2">Author : <Label className="ml-2">{blogData?.author}</Label></div>
                    </div>

                    <div className="flex gap-2">
                        <Link href={"/blogs"} className="mt-6"><Button>Back</Button></Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
