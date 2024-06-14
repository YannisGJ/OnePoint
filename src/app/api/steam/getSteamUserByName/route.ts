"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_docs/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const param = searchParams.get("st_user_nickname");
        console.log(param);

        const result = await prisma.steamUser.findMany({
            where: {
                name: {
                    contains: param,
                    mode: "insensitive",
                },
            },
        });
        return NextResponse.json({ result });
    } catch {
        return NextResponse.error();
    }
}
