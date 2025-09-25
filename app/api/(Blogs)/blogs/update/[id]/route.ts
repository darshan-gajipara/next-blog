import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";
import { withCORS } from "@/lib/cors";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params

    if (!id) {
      const response = NextResponse.json({ message: "Blog id is required" }, { status: 400 });
      return withCORS(response);
    }

    const { title, content, author } = await req.json();

    if (!title || !content || !author) {
      const response = NextResponse.json({ message: "All fields are required" }, { status: 400 });
      return withCORS(response);
    }

    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      const response = NextResponse.json({ message: "Blog not found" }, { status: 404 });
      return withCORS(response);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );

    const response = NextResponse.json(updatedBlog, { status: 200 });
    return withCORS(response);
  } catch (error) {
    const response = NextResponse.json(
      { message: "Error updating blog", error: String(error) },
      { status: 500 }
    );
    return withCORS(response);
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return withCORS(NextResponse.json({}, { status: 200 }));
}
