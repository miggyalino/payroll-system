import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const employees = await prisma.employee.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    });
    return NextResponse.json(employees);
}

export async function PUT (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const json = await request.json()
    const updatedEmployee = await prisma.employee.update({
        where: {
            id: parseInt(id, 10)
        },
        data: json
    })

    return NextResponse.json(updatedEmployee);
}

export async function DELETE (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const deletedEmployee = await prisma.employee.delete({
        where: {
            id: parseInt(id, 10)
        }
    })

    return NextResponse.json(deletedEmployee);
}