"use client";

import Logo from "./headercontents/logo";
import Image from "next/image";
import userimg from "@/app/_images/Chokbar.jpg";
import UserList from "@/app/_docs/userList.json";
import { useState } from "react";
import useSWR from "swr";
import { debounce } from "lodash";

// const fetcher = (url: string): Promise<any> =>
//     fetch(url).then((res) => res.json());

export default function Header() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // const { data: results, error } = useSWR(
    //     query ? `/api/user/findUser?user=${query}` : null,
    //     fetcher
    // );
    const search = async (value) => {
        UserList.users.map((user, index) => {
            if (user.pseudo.includes(value)) {
                console.log(user.id);
            }
        });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.value);
        debouncedSearch(event.target.value);
        setQuery(event.target.value);
    };

    const debouncedSearch = debounce(search, 300);

    return (
        <section className="bg-stone-900 w-full h-20 flex items-center justify-between drop-shadow-md border-bottom-gradient">
            <div className="ml-10">
                <Logo />
            </div>

            <div className="">
                <input
                    className="rounded-full w-full h-10 bg-stone-800 text-white pl-4"
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={handleSearch}
                />
            </div>
            <div className="flex mr-10">
                <div className="font-bold">
                    <p>SuleyLaMerdeALol</p>
                </div>
                <div className="flex justify-evenly">
                    <p>Rank</p>
                    <p>Level</p>
                </div>
                <Image
                    className="rounded-full ml-4"
                    src={userimg}
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
            </div>
        </section>
    );
}
function setQuery(value: any) {
    throw new Error("Function not implemented.");
}
