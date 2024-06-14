"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_docs/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("st_user_id");
    const dbuser = await prisma.steamUser.findMany({
        where: {
            steamId: param,
        },
    });
    if (dbuser.length === 0) {
        const wbuser = await fetch(
            `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${param}`
        );
        const userData = await wbuser.json();
        if (userData.response.players.length !== 0) {
            await prisma.steamUser.create({
                data: {
                    name: userData.response.players[0].personaname,
                    steamId: userData.response.players[0].steamid,
                    avatar: userData.response.players[0].avatarfull,
                    profileurl: userData.response.players[0].profileurl,
                    loccountrycode: userData.response.players[0].loccountrycode,
                },
            });
            return NextResponse.json("User Created");
        } else {
            return NextResponse.json({ error: "No user found" });
        }
    } else {
        return NextResponse.json(dbuser);
    }
}
