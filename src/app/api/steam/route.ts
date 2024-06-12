"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("st_user_id");
    console.log(param);
    const games = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${param}&format=json`
    );
    const data = await games.json();

    return NextResponse.json({ data });

    // console.log(users);

    // const games = await fetch(
    //     `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamid=${param}`
    // );
    // const data = await games.json();

    // return NextResponse.json({ data });
}
