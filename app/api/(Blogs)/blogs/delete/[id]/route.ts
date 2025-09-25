import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";
import { withCORS } from "@/lib/cors";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      const response = NextResponse.json({ message: "Blog not found" }, { status: 404 });
      return withCORS(response);
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    const response = NextResponse.json(deletedBlog, { status: 200 });
    return withCORS(response);
  } catch (error) {
    const response = NextResponse.json(
      { message: "Error deleting blog", error: String(error) },
      { status: 500 }
    );
    return withCORS(response);
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return withCORS(NextResponse.json({}, { status: 200 }));
}
