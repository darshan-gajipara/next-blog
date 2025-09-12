import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = await params?.id;
        await connectDB();

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog, { status: 200 });

    } catch (error) {
        return NextResponse.json("Error featching blog" + JSON.stringify(error), { status: 500 })
    }
}