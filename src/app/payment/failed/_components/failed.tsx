"use client";

import { Button } from "@/components/ui/button";
import { Ban, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Failed() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Ban className="size-16 text-red-500" />
      <h1 className="text-2xl font-bold">Payment Error</h1>
      <Link href={"/order"}>
        <Button>Back To Order</Button>
      </Link>
    </div>
  );
}
