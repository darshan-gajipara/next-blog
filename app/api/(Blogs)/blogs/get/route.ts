import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        let query = {};

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } },
                ],
            };
        }

        // const skip = (page - 1) * limit;

        const blogs = await Blog.find(query, null, {
            skip: (page - 1) * limit,
            limit: limit,
        });


        const total = await Blog.countDocuments(query);

        return NextResponse.json(
            {
                data: blogs,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json("Error featching blogs" + JSON.stringify(error), { status: 500 })
    }
}