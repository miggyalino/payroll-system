import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request){
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
}

export async function POST (request: Request){
    try {
        const json = await request.json()
        const createdEmployee = await prisma.employee.create({
            data: json
        })

        return NextResponse.json(createdEmployee, {status: 201});
    } catch (error) {
        console.error("Error creating employee:", error)
        return NextResponse.json(error, {status: 500})
    }
}