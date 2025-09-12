import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params?.id;
        await connectDB();

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        const DeletedBlog = await Blog.findByIdAndDelete(id);
        return NextResponse.json(DeletedBlog, { status: 200 });

    } catch (error) {
        return NextResponse.json("Error deleting blog" + JSON.stringify(error), { status: 500 })
    }
}