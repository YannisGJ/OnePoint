"use client";

import Logo from "./headercontents/logo/logo";
import Image from "next/image";
import { useState, useContext, MouseEventHandler, useEffect } from "react";
import axios from "axios";
import { AppContext } from "@/app/store/store";
import Auth from "./headercontents/login/login";

export default function Header() {
    type user = {
        id: number;
        name: string;
        rank: string;
        niveau: number;
        avatar: string;
    };

    let { setSearchedUserId } = useContext(AppContext);

    const [result, setResult] = useState<Array<user>>();

    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const search = async (value: string) => {
        if (value != "" && value != null && value != undefined) {
            const response = await axios.get(
                `/api/steam/getSteamUserByName/?st_user_nickname=${value}`
            );
            setResult(response.data.result);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSearchChange = (event) => {
        search(event.target.value);
        setSearchTerm(event.target.value);
    };

    const loadUserPage: MouseEventHandler<HTMLDivElement> = (event) => {
        setSearchedUserId(event.currentTarget.dataset.userId as string);
    };

    const handleClickOutside = (event) => {
        if (
            !event.target.closest(".search-dropdown") &&
            !event.target.closest(".search-input")
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <section className="bg-stone-900 w-full h-20 flex items-center justify-between drop-shadow-md border-bottom-gradient">
            <div className="w-1/6 h-full content-center">
                <Logo />
            </div>
            <div className="flex w-2/6">
                <input
                    className="rounded-full w-full h-10 bg-stone-800 text-white pl-4"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {showDropdown && result != null && (
                <div className="w-1/2 h-fit bg-stone-800 absolute top-full left-1/4 mt-5 rounded-lg">
                    {result?.map((user, index) => (
                        <div
                            key={user.id}
                            className=" p-2 w-full h-full justify-center text-white"
                        >
                            <div
                                className="flex hover:bg-stone-700 hover:cursor-pointer rounded-lg"
                                onClick={loadUserPage}
                                role="button"
                                tabIndex={0}
                                data-user-id={user.id}
                            >
                                <div className="justify-center">
                                    {/* <Image
                                        src={user.avatar}
                                        layout="fill"
                                        objectFit="contain"
                                        alt="Picture of the author"
                                    ></Image> */}
                                </div>
                                <div className="flex h-full w-2/3 justify-center">
                                    <div className="flex flex-col">
                                        <div className="font-bold">
                                            {user.name}
                                        </div>
                                        <div className="flex">
                                            <div>{user.rank}</div>
                                            <div>Nv : {user.niveau}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-t-2 bg-stone-700 opacity-10 rounded-full"></hr>
                        </div>
                    ))}
                </div>
            )}
            <Auth />
        </section>
    );
}
