"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    orderId && (
      <div
        className={
          "flex flex-col items-center justify-center gap-10 h-screen top-1/2"
        }
      >
        <div className={"flex flex-col items-center justify-center gap-2"}>
          <CheckCircle2 className={"text-green-500"} size={50} />
          <h1 className={"text-green-500 font-bold text-lg uppercase"}>
            Thank you for ordering!
          </h1>
        </div>
        <div className={"flex flex-col items-center justify-center gap-2"}>
          <h1 className={"text-sm"}>Order ID</h1>
          <h1 className={"text-base"}>{orderId}</h1>
        </div>

        <Button asChild>
          <Link href={"/menu"}>Go Back</Link>
        </Button>
      </div>
    )
  );
}
