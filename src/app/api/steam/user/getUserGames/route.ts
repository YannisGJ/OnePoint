"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("steamUserId");
    console.log(param);
    const games = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${param}&format=json`
    );

    console.log(process.env.STEAM_API_KEY);
    console.log(games);

    return NextResponse.json({ games: games });
}
