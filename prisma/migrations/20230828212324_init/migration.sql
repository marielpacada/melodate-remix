-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "swiped" BOOLEAN NOT NULL DEFAULT false,
    "trackId" TEXT,
    CONSTRAINT "Artist_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "preview" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_trackId_key" ON "Artist"("trackId");
