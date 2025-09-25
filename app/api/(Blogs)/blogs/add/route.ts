import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";
import { withCORS } from "@/lib/cors";

export async function POST(req: NextRequest) {
  try {
    const { title, content, author } = await req.json();

    if (!title || !content || !author) {
      const response = NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
      return withCORS(response);
    }

    await connectDB();
    const newBlog = new Blog({ title, content, author });
    const blog = await newBlog.save();

    const response = NextResponse.json(blog, { status: 200 });
    return withCORS(response);
  } catch (error) {
    const response = NextResponse.json(
      { message: "Error creating blog", error: String(error) },
      { status: 500 }
    );
    return withCORS(response);
  }
}

// Handle preflight requests (important for CORS)
export async function OPTIONS() {
  return withCORS(NextResponse.json({}, { status: 200 }));
}
