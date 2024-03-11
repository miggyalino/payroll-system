import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, username: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (user) {
            const employee = await prisma.employee.findUnique({
                where: {
                    id: user.employeeId
                }
            });

            if (employee) {
                console.log(employee);
            } else {
                console.log('No employee found for this user');
            }
        } else {
            console.log('No user found with this username');
        }
    } catch (error) {
        console.log(error)
    }
}