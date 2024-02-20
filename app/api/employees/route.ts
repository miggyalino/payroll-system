import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request){
    const employees = await prisma.employee.findMany({
        include: {
            position: {
                include: {
                    department: true,
                },
            },
        },
    });
    return NextResponse.json(employees);
}

export async function POST (request: Request){
    try {
        const json = await request.json()

         // Check if the Position record exists
        const position = await prisma.position.findUnique({
            where: { id: json.position },
        });
    
        // If the Position record doesn't exist, return an error response
        if (!position) {
            return NextResponse.json({ error: `Position with ID ${json.position} does not exist` }, { status: 400 });
        }
  
        const createdEmployee = await prisma.employee.create({
            data: {
                ...json,
                position: {
                    connect: {
                        id: json.position,
                    },
                },
            }
        })

        return NextResponse.json(createdEmployee, {status: 201});
    } catch (error) {
        console.error("Error creating employee:", error)
        return NextResponse.json(error, {status: 500})
    }
}