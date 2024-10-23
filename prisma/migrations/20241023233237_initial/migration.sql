-- CreateTable
CREATE TABLE "Streamer" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "Streamer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commands" (
    "id" SERIAL NOT NULL,
    "streamerId" INTEGER NOT NULL,
    "command" TEXT NOT NULL,

    CONSTRAINT "Commands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "streamerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_userName_key" ON "Streamer"("userName");

-- AddForeignKey
ALTER TABLE "Commands" ADD CONSTRAINT "Commands_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
