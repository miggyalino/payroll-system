import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const employees = await prisma.employee.findUnique({
        where: {
            id: parseInt(id, 10)
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
    return NextResponse.json(employees);
}

// Buggy PUT Function need to fix
export async function PUT (request: Request, { params } : { params: { id: string }}) {
    const id = params.id
    const { employee, earnings, deductions, user} = await request.json()
    const updatedEmployee = await prisma.employee.update({
        where: {
            id: parseInt(id, 10)
        },
        data: 
        {
            ...employee,
            position: {
                connect: {
                    id: employee.positionId
                }
            },
            earnings: {
                update: earnings
            },
            deductions: {
                update: deductions
            },
            user: {
                update: {
                    username: user.username,
                    password: user.password,
                    role: user.role
                }
            }
        }
    })

    return NextResponse.json(updatedEmployee);
}

export async function DELETE (request: Request, { params } : { params: { id: string }}) {
    const id = params.id

    // Delete the associated earnings
    await prisma.earnings.deleteMany({
        where: {
            employeeId: Number(id)
        }
    });

    // Delete the associated deductions
    await prisma.deduction.deleteMany({
        where: {
            employeeId: Number(id)
        }
    });

    await prisma.user.deleteMany({
        where: {
            employeeId: Number(id)
        }
    });

    
    const deletedEmployee = await prisma.employee.delete({
        where: {
            id: parseInt(id, 10)
        }
    })

    return NextResponse.json(deletedEmployee);
}