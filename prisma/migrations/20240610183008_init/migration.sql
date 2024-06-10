-- CreateTable
CREATE TABLE "SteamUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "profileurl" TEXT NOT NULL,
    "loccountrycode" TEXT NOT NULL,

    CONSTRAINT "SteamUser_pkey" PRIMARY KEY ("id")
);
