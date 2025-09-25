import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting blog", error: String(error) },
      { status: 500 }
    );
  }
}
