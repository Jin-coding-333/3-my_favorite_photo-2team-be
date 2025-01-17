/*
  Warnings:

  - You are about to drop the column `remainingQuantity` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuantity` on the `Card` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Exchange` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "remainingQuantity",
DROP COLUMN "totalQuantity",
ADD COLUMN     "uniqueId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
