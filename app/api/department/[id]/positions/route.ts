import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET (request: Request, { params }: { params: { id: string } }){
    const positions = await prisma.position.findMany({
        where: {
            departmentId: Number(params.id)
        }
    });
    return NextResponse.json(positions);

}

export async function POST (request: Request, { params }: { params: { id: string } }){
    try {
        const json = await request.json()

        // Get the position with the highest id
        const lastPosition = await prisma.position.findFirst({
            orderBy: {
            id: 'desc',
            },
        });
        
        // Calculate the next id
        const nextId = (lastPosition?.id || 0) + 1;

        const createdPosition = await prisma.position.create({
            data: {
                ...json,
                id: nextId,
                departmentId: Number(params.id)
            }
        })

        return new NextResponse(JSON.stringify(createdPosition), {status: 201})
    } catch (error) {
        console.error("Error creating position:", error)
        return NextResponse.json(error, {status: 500})
    }
}