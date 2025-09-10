import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params?.id;
        if (!id) {
            return NextResponse.json({ message: "Blog id is required" }, { status: 400 })
        }
        const { title, content, author } = await req.json();
        if (!title || !content || !author) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }
        await connectDB();

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, author }, { new: true })
        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        return NextResponse.json(JSON.stringify(error), { status: 500 })
    }
}