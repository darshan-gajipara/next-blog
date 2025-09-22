import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { PipelineStage } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        // let query = {};

        // if (search) {
        //     query = {
        //         $or: [
        //             { title: { $regex: search, $options: "i" } },
        //             { author: { $regex: search, $options: "i" } },
        //             { content: { $regex: search, $options: "i" } },
        //         ],
        //     };
        // }
        // const blogs = await Blog.find(query, null, {
        //     skip: (page - 1) * limit,
        //     limit: limit,
        // });
        // const total = await Blog.countDocuments(query);


        const skip = (page - 1) * limit;

        const pipeline: PipelineStage[] = [
            { $skip: skip },
            { $limit: limit },
        ];

        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: search, $options: "i" } },
                        { author: { $regex: search, $options: "i" } },
                        { content: { $regex: search, $options: "i" } },
                    ],
                },
            });
        }

        const blogs = await Blog.aggregate(pipeline);
        const total = await Blog.countDocuments();
        

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