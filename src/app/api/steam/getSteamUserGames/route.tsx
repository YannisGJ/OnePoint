"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_docs/lib/prisma";

export async function GET(req: NextRequest) {
    type user = {
        id: number;
        userid: string;
    };

    type st_user_game = {
        userid: string;
        appid: string;
    };

    try {
        const { searchParams } = new URL(req.url);
        const param = searchParams.get("st_user_id");
        console.log(param);
        let game_index = 0;

        console.log("1");
        const userResult = await prisma.SteamUser.findMany({
            where: {
                userid: param,
            },
        });
        console.log("2");

        console.log(userResult);
        if (userResult.length != 0) {
            userResult.map(async (user: user) => {
                console.log(user.id);
                const userGamesResult = await prisma.UserGames.findMany({
                    where: {
                        userid: user.id,
                    },
                });
                console.log(userGamesResult);
                console.log("2");
                //console.log("userGamesResult" + userGamesResult);
                if (userGamesResult.length == 0) {
                    let user_st_id;
                    console.log("2");
                    userResult.map((user: user) => {
                        console.log(user.userid);
                        user_st_id = user.userid;
                    });
                    const st_user_fetchedGames = await fetch(
                        `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${user_st_id}&format=json&include_played_free_games=1`
                    );
                    if (st_user_fetchedGames.status !== 200) {
                        return NextResponse.error();
                    } else {
                        const st_user_games = await st_user_fetchedGames.json();
                        const ar_st_games = st_user_games.response.games;
                        console.log(ar_st_games);
                        let ar_games: Array<st_user_game> = [];
                        ar_st_games.map(async (user_game: st_user_game) => {
                            console.log(user_game.appid);
                            ar_games.push({
                                userid: user.id.toString(),
                                appid: user_game.appid.toString(),
                            });
                            console.log("3");
                            console.log(user_game.appid);
                            if (
                                (
                                    await prisma.Game.findMany({
                                        where: {
                                            appid: user_game.appid.toString(),
                                        },
                                    })
                                ).length == 0
                            ) {
                                console.log("3");
                                console.log(user_game.appid);
                                await prisma.Game.create({
                                    data: {
                                        appid: user_game.appid.toString(),
                                        name: "",
                                        type: "",
                                        headerImage: "",
                                        steamShopUrl: "",
                                    },
                                });
                                console.log("3");
                            }
                            console.log("3");
                            getGamesDetails(user_game.appid);
                        });
                        await Promise.all(
                            ar_games.map((game: st_user_game) => {
                                return prisma.UserGames.create({
                                    data: {
                                        userid: user.id,
                                        appid: game.appid,
                                    },
                                });
                            })
                        );
                        console.log("3");
                    }
                }
            });
        }
        const getGamesDetails = async (st_game_appid: string) => {
            if (game_index < 6) {
                console.log("3");
                const game_details_response = await fetch(
                    `http://localhost:3000/api/steam/getGamesDetails?st_game_id=${st_game_appid}`
                );
                console.log("3");
                const game_details = await game_details_response.json();
                game_index++;

                prisma.Game.update({
                    where: { appid: st_game_appid },
                    data: {
                        name: game_details[st_game_appid].data.name,
                        type: game_details[st_game_appid].data.type,
                        headerImage:
                            game_details[st_game_appid].data.header_image,
                        steamShopUrl: `https://store.steampowered.com/app/${st_game_appid}/`,
                    },
                });
                console.log(game_details[st_game_appid].data.name);
            } else {
                game_index++;
            }
        };

        return NextResponse.json("ok");
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
