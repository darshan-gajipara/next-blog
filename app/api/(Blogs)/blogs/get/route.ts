import connectDB from "@/lib/db";
import Blog from "@/lib/models/blogs";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        const blogs = await Blog.find();
        return NextResponse.json(blogs,{status:200});
    } catch(error){
        return NextResponse.json("Error featching blogs" + JSON.stringify(error), {status:500})
    }
}