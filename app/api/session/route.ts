import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET (request: Request){
    try {
        const session = await getServerSession(authOptions);
        return NextResponse.json(session , {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, {status: 500})
    }
}