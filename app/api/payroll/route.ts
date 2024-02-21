import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request){
    const payroll = await prisma.payroll.findMany();
    return NextResponse.json(payroll);
}

export async function POST (request: Request){
    try {
        const json = await request.json()

        const date = new Date();
        const currentMonth = (date.getMonth() + 1).toString();
        const currentYear = date.getFullYear();

        const createdPayroll = await prisma.payroll.create({
            data: {
                ...json,
                month: currentMonth,
                year: currentYear,
            }
        })

        return NextResponse.json(createdPayroll, {status: 201});
    } catch (error) {
        console.error("Error creating department:", error)
        return NextResponse.json(error, {status: 500})
    }
}