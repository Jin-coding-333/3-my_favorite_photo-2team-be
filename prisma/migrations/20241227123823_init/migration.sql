-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "emial" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emial_key" ON "User"("emial");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");
