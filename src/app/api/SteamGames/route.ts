import users from "@/app/_docs/users.json";
import { NextResponse } from "next/server";

export async function GET() {
    const game = await fetch(
        "https://store.steampowered.com/api/appdetails?appids=2711320"
    );

    return NextResponse.json(game);
}
