"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_docs/lib/prisma";

export async function GET(req: NextRequest) {
    type user = {
        id: number;
        steamId: string;
    };

    type st_game = {
        appid: number;
        steamId: string;
        headerImage: string;
        steamRating: string;
        steamShopUrl: string;
    };

    try {
        const { searchParams } = new URL(req.url);
        const param = parseInt(searchParams.get("user_id") || "0");
        console.log(param);

        const userResult = await prisma.steamUser.findMany({
            where: {
                id: param,
            },
        });

        console.log(userResult);
        if (userResult.length != 0) {
            userResult.map(async (user: user) => {
                const userGamesResult = await prisma.UserGames.findMany({
                    where: { userId: user?.id },
                });
                //console.log("userGamesResult" + userGamesResult);
                if (userGamesResult.length == 0) {
                    let user_st_id;
                    userResult.map((user: user) => {
                        console.log(user.steamId);
                        user_st_id = user.steamId;
                    });
                    const st_fetchedGames = await fetch(
                        `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${user_st_id}&format=json&include_played_free_games=1`
                    );
                    if (st_fetchedGames.status !== 200) {
                        return NextResponse.error();
                    } else {
                        const st_games = await st_fetchedGames.json();
                        const ar_st_games = st_games.response.games;
                        let ar_games: Array<st_game> = [];
                        ar_st_games.map(async (_game: st_game) => {
                            console.log(_game.appid);
                            ar_games.push({
                                appid: _game.appid,
                                steamId: "",
                                headerImage: "",
                                steamRating: "5",
                                steamShopUrl: "",
                            });
                            if (
                                (
                                    await prisma.Game.findMany({
                                        where: { id: _game.appid },
                                    })
                                ).length == 0
                            ) {
                                await prisma.Game.create({
                                    data: {
                                        id: _game.appid,
                                        steamId: "",
                                        name: "",
                                        headerImage: "",
                                        steamRating: "5",
                                        steamShopUrl: "",
                                    },
                                });
                            }
                        });
                        await Promise.all(
                            ar_games.map((game: st_game) => {
                                return prisma.UserGames.create({
                                    data: {
                                        userId: user.id,
                                        gameId: game.appid,
                                    },
                                });
                            })
                        );
                    }
                }
            });
        }
        const getGamesDetail = async (st_game_id: number) => {
            const gameDetails = await fetch(
                `https://store.steampowered.com/api/appdetails?appids=${st_game_id}`
            );
            console.log(gameDetails);
        };

        return NextResponse.json("ok");
    } catch {
        return NextResponse.error();
    }
}
