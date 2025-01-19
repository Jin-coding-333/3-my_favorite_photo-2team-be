/*
  Warnings:

  - You are about to drop the `_CardToPurchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardToPurchase" DROP CONSTRAINT "_CardToPurchase_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToPurchase" DROP CONSTRAINT "_CardToPurchase_B_fkey";

-- DropTable
DROP TABLE "_CardToPurchase";

-- CreateTable
CREATE TABLE "_PurchaseCards" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PurchaseCards_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PurchaseCards_B_index" ON "_PurchaseCards"("B");

-- AddForeignKey
ALTER TABLE "_PurchaseCards" ADD CONSTRAINT "_PurchaseCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseCards" ADD CONSTRAINT "_PurchaseCards_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
