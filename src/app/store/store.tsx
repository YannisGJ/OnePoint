"use client";
import { createContext, useMemo, useState } from "react";

type queryContextType = {
    queryEntry: Array<string>; // Specify the type argument for the Array generic type
    setQueryEntry: (query: Array<string>) => void;
};

export const AppContext = createContext({} as queryContextType);

export default function AppWrapper({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [queryEntry, setQueryEntry] = useState<Array<string>>([]); // Update the type of queryEntry to be an array of strings

    const contextValue = useMemo(
        () => ({ queryEntry, setQueryEntry }),
        [queryEntry, setQueryEntry]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
