import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET (request: Request, params: {id: string}){
    const positions = await prisma.position.findMany({
        where: {
            departmentId: parseInt(params.id)
        }
    });
    return NextResponse.json(positions);

}

export async function POST (request: Request, params: {id: string}){
    try {
        const json = await request.json()
        const createdPosition = await prisma.position.create({
            data: {
                ...json,
                departmentId: parseInt(params.id)
            }
        })

        return NextResponse.json(createdPosition, {status: 201});
    } catch (error) {
        console.error("Error creating position:", error)
        return NextResponse.json(error, {status: 500})
    }
}