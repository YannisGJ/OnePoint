import user from "@/app/_docs/users.json";
import { NextResponse } from "next/server";

export async function GET() {
    const res = user.users[0].user.games;

    return NextResponse.json(res);
}
