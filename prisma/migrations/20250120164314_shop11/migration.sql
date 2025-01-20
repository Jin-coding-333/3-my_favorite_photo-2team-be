/*
  Warnings:

  - You are about to drop the column `content` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `genre` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "content",
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
