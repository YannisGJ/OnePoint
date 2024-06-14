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

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "headerImage" TEXT NOT NULL,
    "steamRating" TEXT NOT NULL,
    "steamShopUrl" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGames" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "UserGames_pkey" PRIMARY KEY ("userId","gameId")
);

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SteamUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
