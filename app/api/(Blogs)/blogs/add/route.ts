import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { title, content, author } = await req.json();
        if (!title || !content || !author) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }
        await connectDB();
        const newBlog = new Blog({ title, content, author });
        const blog = await newBlog.save();
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        return NextResponse.json(JSON.stringify(error), { status: 500 })
    }
}