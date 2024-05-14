import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const payrollData = await prisma.payroll.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      employee: {
        include: {
          position: {
            include: {
              department: true,
            },
          },
          earnings: true,
          deductions: true,
        },
      },
    },
  });
  return NextResponse.json(payrollData);
}
