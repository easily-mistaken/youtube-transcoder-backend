/*
  Warnings:

  - You are about to drop the column `description` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `uploaderId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Video` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewCount` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_uploaderId_fkey";

-- DropIndex
DROP INDEX "Video_url_key";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "description",
DROP COLUMN "dislikes",
DROP COLUMN "duration",
DROP COLUMN "isPublished",
DROP COLUMN "likes",
DROP COLUMN "thumbnail",
DROP COLUMN "updatedAt",
DROP COLUMN "uploaderId",
DROP COLUMN "url",
DROP COLUMN "views",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
