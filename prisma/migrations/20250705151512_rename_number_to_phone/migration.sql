/*
  Warnings:

  - You are about to drop the column `number` on the `phones` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `phones` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `phones` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "phones_number_key";

-- AlterTable
ALTER TABLE "phones" DROP COLUMN "number",
ADD COLUMN     "phone" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "phones_phone_key" ON "phones"("phone");
