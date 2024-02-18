import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET (request: Request, { params }: { params: { id: string } }){
    const deduction = await prisma.deduction.findMany({
        where: {
            employeeId: Number(params.id)
        }
    });
    return NextResponse.json(deduction);

}

export async function POST (request: Request, { params }: { params: { id: string } }){
    try {
        const json = await request.json()

        // Get the position with the highest id
        const lastPosition = await prisma.deduction.findFirst({
            orderBy: {
            id: 'desc',
            },
        });
        
        // Calculate the next id
        const nextId = (lastPosition?.id || 0) + 1;

        const createdDeduction = await prisma.deduction.create({
            data: {
                ...json,
                id: nextId,
                employeeId : Number(params.id)
            }
        })

        return new NextResponse(JSON.stringify(createdDeduction), {status: 201})
    } catch (error) {
        console.error("Error creating employee:", error)
        return NextResponse.json(error, {status: 500})
    }
}