import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params } : { params: { id: string }}) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(params.id)
            }
        });

        if (user) {
            const employee = await prisma.employee.findUnique({
                where: {
                    id: user.employeeId
                },
                include: {
                    position: {
                        include: {
                            department: true
                        }
                    },
                    user: true,
                }
            });

            if (employee) {
                return NextResponse.json(employee)
            } else {
                return NextResponse.json({ error: `ID does not exist` }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: `Username does not exist` }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: `Error` }, { status: 400 });
    }
}