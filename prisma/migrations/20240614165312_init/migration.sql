/*
  Warnings:

  - You are about to drop the `UserGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserGames" DROP CONSTRAINT "UserGames_gameId_fkey";

-- DropForeignKey
ALTER TABLE "UserGames" DROP CONSTRAINT "UserGames_userId_fkey";

-- DropTable
DROP TABLE "UserGames";
