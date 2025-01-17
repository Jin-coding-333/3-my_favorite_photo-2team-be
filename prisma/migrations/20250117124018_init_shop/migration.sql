/*
  Warnings:

  - Added the required column `remainingQuantity` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "remainingQuantity" INTEGER NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL;
