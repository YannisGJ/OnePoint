"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_docs/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const param: number = parseInt(searchParams.get("user_id") || "0");
        console.log(param);

        const result = await prisma.steamUser.findMany({
            where: {
                id: param,
            },
        });
        console.log(result);
        return NextResponse.json({ result });
    } catch {
        return NextResponse.error();
    }
}
