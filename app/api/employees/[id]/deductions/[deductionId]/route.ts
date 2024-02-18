import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request, { params: {id, deductionId} } : { params: { id: string; deductionId: string }}) {
    const deduction = await prisma.deduction.findFirst({
        where: {
            id: Number(deductionId),
            employeeId: Number(id)
        }
    });
    return NextResponse.json(deduction);
}

export async function PUT (request: Request, { params: {id, deductionId} } : { params: { id: string; deductionId: string }}) {
    const json = await request.json()
    const updatedDeduction = await prisma.deduction.update({
        where: {
            id: Number(deductionId),
        },
        data: json
    })

    return NextResponse.json(updatedDeduction);
}

export async function DELETE (request: Request, { params: {deductionId} } : { params: { id: string; deductionId: string }}) {
    const deletedDeduction = await prisma.deduction.delete({
        where: {
            id: Number(deductionId)
        }
    })

    return NextResponse.json(deletedDeduction);
}