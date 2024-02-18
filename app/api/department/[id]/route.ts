import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const department = await prisma.department.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    });
    return NextResponse.json(department);
}

export async function PUT (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const json = await request.json()
    const updatedDepartment = await prisma.department.update({
        where: {
            id: parseInt(id, 10)
        },
        data: json
    })

    return NextResponse.json(updatedDepartment);
}

export async function DELETE (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const deletedDepartment = await prisma.department.delete({
        where: {
            id: parseInt(id, 10)
        }
    })

    return NextResponse.json(deletedDepartment);
}