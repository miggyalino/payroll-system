import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request){
    const department = await prisma.department.findMany();
    return NextResponse.json(department);
}

export async function POST (request: Request){
    try {
        const json = await request.json()
        const createdDepartment = await prisma.department.create({
            data: json
        })

        return NextResponse.json(createdDepartment, {status: 201});
    } catch (error) {
        console.error("Error creating department:", error)
        return NextResponse.json(error, {status: 500})
    }
}