import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request, { params: {id, positionId} } : { params: { id: string; positionId: string }}) {
    const position = await prisma.position.findFirst({
        where: {
            id: Number(positionId),
            departmentId: Number(id)
        }
    });
    return NextResponse.json(position);
}

export async function PUT (request: Request, { params: {id, positionId} } : { params: { id: string; positionId: string }}) {
    const json = await request.json()
    const updatedPosition = await prisma.position.update({
        where: {
            id: Number(positionId),
        },
        data: json
    })

    return NextResponse.json(updatedPosition);
}

export async function DELETE (request: Request, { params: {positionId} } : { params: { id: string; positionId: string }}) {
    const deletedPosition = await prisma.position.delete({
        where: {
            id: Number(positionId)
        }
    })

    return NextResponse.json(deletedPosition);
}