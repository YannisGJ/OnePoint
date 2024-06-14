"use client";
import { createContext, useMemo, useState } from "react";

type queryContextType = {
    searchedUserId: string;
    setSearchedUserId: (query: string) => void;
};

export const AppContext = createContext({} as queryContextType);

export default function AppWrapper({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [searchedUserId, setSearchedUserId] = useState("");

    const contextValue = useMemo(
        () => ({ searchedUserId, setSearchedUserId }),
        [searchedUserId, setSearchedUserId]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
