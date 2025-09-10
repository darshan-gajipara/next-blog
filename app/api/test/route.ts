import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({message:"this is from test api route"})
}

export async function POST(res:Request){
    const {name} = await res.json();
    if(!name){
        return NextResponse.json({message : "Name is required"}, {status:400})
    }
    return NextResponse.json({message : `Hello, ${name}, this is post req`})
}