-- CreateTable
CREATE TABLE "menu" (
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "receipt" (
    "receiptId" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receipt_pkey1" PRIMARY KEY ("receiptId")
);

-- CreateTable
CREATE TABLE "receipt_item" (
    "receiptId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "quantity" DECIMAL,

    CONSTRAINT "receipt_item_pkey1" PRIMARY KEY ("receiptId","productId","temperature")
);

-- AddForeignKey
ALTER TABLE "receipt_item" ADD CONSTRAINT "receipt_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "menu"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "receipt_item" ADD CONSTRAINT "receipt_item_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "receipt"("receiptId") ON DELETE NO ACTION ON UPDATE NO ACTION;
