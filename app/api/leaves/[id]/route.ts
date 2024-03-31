import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const json = await request.json();

    const approvedLeave = await prisma.leave.update({
      where: {
        id: Number(id),
      },
      data: {
        status: json.status,
      },
    });
    return NextResponse.json(approvedLeave);
  } catch (error) {
    console.log(error);
  }
}
