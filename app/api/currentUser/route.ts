import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const userHeader = request.headers.get("user");
    const User  = JSON.parse(userHeader!)
    return NextResponse.json(User,{status:200})
}