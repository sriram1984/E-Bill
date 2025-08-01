"use client";

import { useTransition } from "react";

export default function LogoutButton({ action }: { action: () => void }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => action())}
      disabled={isPending}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
