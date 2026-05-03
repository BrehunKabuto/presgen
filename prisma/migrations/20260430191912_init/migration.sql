-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "emeil" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emeil_key" ON "User"("emeil");
