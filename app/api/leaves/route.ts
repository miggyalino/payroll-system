import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const leaves = await prisma.leave.findMany();
  return NextResponse.json(leaves);
}

export async function POST(request: Request) {
  const json = await request.json();

  const leaves = await prisma.leave.create({
    data: {
      ...json,
    },
  });
  return NextResponse.json(leaves, { status: 201 });
}
