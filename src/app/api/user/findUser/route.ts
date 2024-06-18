"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const STEAM_USER_ID = searchParams.get("steamUserId");
    console.log(STEAM_USER_ID);
    const userInfos = await fetch(
        `https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${STEAM_USER_ID}&relationship=friend`
    );
    const data = await userInfos.json();

    for (const friend of data.friendslist.friends) {
        console.log(friend.steamid);
    }

    return NextResponse.json({ data });
}
