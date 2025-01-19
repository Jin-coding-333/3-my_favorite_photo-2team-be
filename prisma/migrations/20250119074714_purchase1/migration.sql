/*
  Warnings:

  - You are about to drop the column `cardId` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_cardId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "cardId";

-- CreateTable
CREATE TABLE "_CardToPurchase" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CardToPurchase_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CardToPurchase_B_index" ON "_CardToPurchase"("B");

-- AddForeignKey
ALTER TABLE "_CardToPurchase" ADD CONSTRAINT "_CardToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToPurchase" ADD CONSTRAINT "_CardToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
