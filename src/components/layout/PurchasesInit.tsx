"use client";

import { useEffect } from "react";

export function PurchasesInit() {
  useEffect(() => {
    import("@/lib/purchases").then((m) => m.initPurchases()).catch(() => {});
  }, []);
  return null;
}
