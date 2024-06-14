import UserDetails from "@/app/_docs/user.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";

export default function Login() {
    const [status, setStatus] = useLocalStorage<boolean>("isLogged", false);

    const router = useRouter();

    const login = () => {
        setStatus(true);
    };

    const logout = () => {
        localStorage.removeItem("isLogged");
        setStatus(false);
        router.push("/");
    };
    console.log(window.localStorage);
    if (status) {
        return (
            <div className="w-1/6 h-full">
                {UserDetails.user.map((user, index) => (
                    <div
                        className="flex w-full h-full justify-evenly"
                        key={user.id}
                    >
                        <div className="flex-col w-1/2 text-white">
                            <div className="font-bold h-1/3">
                                <p>{user.pseudo}</p>
                            </div>
                            <div className="h-2/3">
                                <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
                                    <p>{user.rank}</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 hover:h-4 dark:bg-gray-700 group">
                                    <div
                                        className="bg-green-600 h-full rounded-full dark:bg-green-500"
                                        style={{ width: `${user.niveau}%` }}
                                    >
                                        <p className="text-xs opacity-0 group-hover:opacity-100 flex justify-center">
                                            {user.niveau}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Image
                                src={user.profile_picture}
                                layout="fill"
                                objectFit="contain"
                                alt="Picture of the author"
                            />
                        </div>
                        <button onClick={logout}>Logout</button>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="w-1/6 h-full">
                <div className="flex w-full h-full justify-evenly">
                    <div className="content-center">
                        <button
                            className="bg-green-600 rounded-full h-10 w-20 text-white hover:bg-green-700 hover:drop-shadow-lg"
                            onClick={login}
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="content-center">
                        <button className="bg-blue-600 rounded-full h-10 w-20 text-white hover:bg-blue-700 hover:drop-shadow-lg">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
