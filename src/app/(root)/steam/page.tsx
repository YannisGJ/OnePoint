"use client";
import GameCard from "@/components/games_cards/page";
import Image from "next/image";
import Steamimg from "@/app/_images/Steamsplash.svg";
import Star from "@/app/_images/star-stroke-rounded";
import UserInfos from "@/app/_docs/user.json";
import Link from "next/link";
import { AppContext } from "@/app/store/store";
import { useContext } from "react";

const fetcher = (url: string): Promise<any> =>
    fetch(url).then((res) => res.json());

export default function SteamPage() {
    const { queryEntry } = useContext(AppContext);
    console.log(queryEntry);

    return (
        <div className="h-full w-full">
            <article className="fixed w-1/3 h-full top-0 skew-x-12 -translate-x-20 rounded-lg z-0">
                <Image
                    src={Steamimg}
                    alt=""
                    className="w-full h-full bg-steamSplash object-cover object-left"
                />
            </article>

            <div className="flex items-center flex-col z-10 w-full h-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
                <div className="mt-10 bg-white w-1/2 h-48 z-20 rounded-lg">
                    {queryEntry.map((entry, index) => (
                        <div key={index}>{entry}</div>
                    ))}
                </div>
                <div className="flex justify-center flex-shrink-0 w-full mb-5 p-3 sticky top-0 z-50 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
                    {UserInfos.user.map((user, index) => (
                        <div
                            className="flex items-center m-2 w-11/12"
                            key={user.id}
                        >
                            <div
                                className="w-20 h-20 bg-white rounded-full bg-no-repeat bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${user.profile_picture})`,
                                }}
                            ></div>
                            <div className="flex flex-col ml-4">
                                <div className="flex">
                                    <div className="font-extrabold text-white">
                                        {user.pseudo}
                                    </div>
                                    <Star className="ml-3" fill="yellow" />
                                </div>
                                <div className="text-white">
                                    <Link href={user.steam_link}>
                                        Link to steam profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
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
        </div>
    );
}
