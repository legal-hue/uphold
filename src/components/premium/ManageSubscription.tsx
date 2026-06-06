"use client";

import { useEffect, useState } from "react";
import { Loader2, Settings } from "lucide-react";
import { canManageStripeBilling, openBillingPortal } from "@/lib/purchases";

export function ManageSubscription() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setShow(canManageStripeBilling());
  }, []);

  if (!show) return null;

  const handleClick = async () => {
    setLoading(true);
    setError("");
    const message = await openBillingPortal();
    if (message) {
      setError(message);
      setLoading(false);
    }
    // On success the browser navigates to Stripe, so no need to reset state.
  };

  return (
    <div className="text-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 text-sm text-uphold-neutral-500 hover:text-uphold-neutral-700 py-2 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Settings className="h-4 w-4" />
        )}
        Manage or cancel subscription
      </button>
      {error && <p className="text-xs text-uphold-red mt-1">{error}</p>}
    </div>
  );
}
