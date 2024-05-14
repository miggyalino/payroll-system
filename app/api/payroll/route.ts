import prisma from "@/prisma/client";
import { PodcastIcon } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const payroll = await prisma.payroll.findMany({
    include: {
      employee: {
        include: {
          position: {
            include: {
              department: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(payroll);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const createdPayroll = await prisma.payroll.create({
      data: {
        ...json,
      },
    });

    return NextResponse.json(createdPayroll, { status: 201 });
  } catch (error) {
    console.error("Error creating payroll:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
