"use server";

import prisma from "@/app/_docs/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const param = searchParams.get("st_game_id");

        const game_details = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${param}`
        );
        const gameDetailsJson = await game_details.json();
        return NextResponse.json(gameDetailsJson);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
