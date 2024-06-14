"use client";
import GameCard from "@/components/games_cards/page";
import Image from "next/image";
import Steamimg from "@/app/_images/Steamsplash.svg";
import Star from "@/app/_images/star-stroke-rounded";
import Link from "next/link";
import { AppContext } from "@/app/store/store";
import { use, useContext, useEffect, useState } from "react";
import axios from "axios";

export default function SteamPage() {
    let { searchedUserId } = useContext(AppContext);
    const [result, setResult] = useState<user>();

    type user = {
        id: number;
        name: string;
        profileurl: string;
        niveau: number;
        avatar: string;
    };

    useEffect(() => {
        loadUserDetails();
    }, [searchedUserId]);

    const loadUserDetails = async () => {
        if (
            searchedUserId != "" &&
            searchedUserId != null &&
            searchedUserId != undefined
        ) {
            const response = await axios.get(
                `/api/steam/getSteamUserById/?user_id=${searchedUserId}`
            );
            setResult(response.data.result[0]);
            localStorage.setItem(
                "storedUser",
                JSON.stringify(response.data.result[0])
            );
        } else {
            const storedUser = localStorage.getItem("storedUser");
            setResult(storedUser ? JSON.parse(storedUser) : null);
        }
    };

    return (
        <div className="h-full w-full">
            <article className="fixed w-1/3 h-full top-0 skew-x-12 -translate-x-20 rounded-lg z-0">
                <Image
                    src={Steamimg}
                    alt=""
                    className="w-full h-full bg-steamSplash object-cover object-left"
                />
            </article>
            {result != null || result != undefined ? (
                <div className="flex items-center flex-col z-10 w-full h-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
                    <div className="flex justify-center flex-shrink-0 w-full mb-5 p-3 sticky top-0 z-50 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
                        <div className="flex items-center m-2 w-11/12">
                            <div
                                className="w-20 h-20 bg-white rounded-full bg-no-repeat bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${result.avatar})`,
                                }}
                            ></div>
                            <div className="flex flex-col ml-4">
                                <div className="flex">
                                    <div className="font-extrabold text-white">
                                        {result.name}
                                    </div>
                                    <Star className="ml-3" fill="yellow" />
                                </div>
                                <div className="text-white">
                                    <Link href={result.profileurl}>
                                        Link to steam profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <section className="h-full w-11/12 z-20 flex flex-col pb-4">
                    <div className="flex-grow z-40">
                        <div className="grid grid-cols-3 gap-7">
                            {gamesList.map((game, index) => (
                                <GameCard
                                    key={game.appid}
                                    hours={game.play_time}
                                    game_header_image={game.header_image}
                                    game_shop_url={game.shop_url}
                                />
                            ))}
                        </div>
                    </div>
                </section> */}
                </div>
            ) : (
                <div>No user found</div>
            )}
        </div>
    );
}
