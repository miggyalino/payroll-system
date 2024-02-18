import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request, { params: {id, earningId} } : { params: { id: string; earningId: string }}) {
    const earning = await prisma.earnings.findFirst({
        where: {
            id: Number(earningId),
            employeeId: Number(id)
        }
    });
    return NextResponse.json(earning);
}

export async function PUT (request: Request, { params: {id, earningId} } : { params: { id: string; earningId: string }}) {
    const json = await request.json()
    const updatedEarning = await prisma.earnings.update({
        where: {
            id: Number(earningId),
        },
        data: json
    })

    return NextResponse.json(updatedEarning);
}

export async function DELETE (request: Request, { params: {earningId} } : { params: { id: string; earningId: string }}) {
    const deletedEarning = await prisma.earnings.delete({
        where: {
            id: Number(earningId)
        }
    })

    return NextResponse.json(deletedEarning);
}