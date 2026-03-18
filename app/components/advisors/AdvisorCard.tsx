"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { getAdvisorAvailability } from "@/app/services/advisor.service";
import { Advisor, AdvisorAvailability } from "@/app/types/advisor";

type AdvisorCardProps = {
  advisor: Advisor;
};

type ActionButtonProps = {
  type: "call" | "chat";
  available: boolean;
};

function ActionButton({ type, available }: ActionButtonProps) {
  const isCall = type === "call";
  const label = available
    ? isCall
      ? "CALL NOW"
      : "CHAT NOW"
    : isCall
      ? "CALL LATER"
      : "CHAT LATER";

  return (
    <button
      type="button"
      disabled={!available}
      className={[
        "flex h-10 w-44 items-center justify-center gap-2 rounded-md text-[15px] font-semibold tracking-[0.2px] transition",
        available
          ? "cursor-pointer bg-[#19b6b3] text-white hover:bg-[#13a3a0]"
          : "cursor-not-allowed bg-[#d8dde3] text-white",
      ].join(" ")}
    >
      {isCall ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 4h16a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1z"
            fill="currentColor"
          />
          <rect x="7" y="8" width="10" height="1.8" rx="0.9" fill="white" />
          <rect x="7" y="11.5" width="7" height="1.8" rx="0.9" fill="white" />
        </svg>
      )}

      <span>{label}</span>
    </button>
  );
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  const [availability, setAvailability] = useState<AdvisorAvailability | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      const result = await getAdvisorAvailability(advisor.id);
      setAvailability(result);
    } finally {
      setLoading(false);
    }
  }, [advisor.id]);

  useEffect(() => {
    fetchAvailability();

    intervalRef.current = setInterval(() => {
      fetchAvailability();
    }, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAvailability]);

  return (
    <article className="border-b border-[#d9dde1] bg-white py-8 px-4">
      <div className="flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-start gap-6">
          <Image
            src={advisor.avatar}
            alt={advisor.name}
            className="h-30 w-30 rounded-full object-cover"
            width={50}
            height={50}
          />

          <div className="pt-1">
            <h2 className="text-[24px] font-normal text-[#1aa9b4]">
              {advisor.name}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 flex-col">
          <div className="mb-6">
            <span className="text-[20px] font-semibold text-[#0f2d44]">
              ${advisor.pricePerMinute.toFixed(2)}
            </span>
            <span className="ml-1 text-[16px] font-medium text-[#0f2d44]">
              /min
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {loading || !availability ? (
              <>
                <div className="h-10 w-44 animate-pulse rounded-md bg-[#d8dde3]" />
                <div className="h-10 w-44 animate-pulse rounded-md bg-[#d8dde3]" />
              </>
            ) : (
              <>
                <ActionButton
                  type="call"
                  available={availability.callAvailable}
                />
                <ActionButton
                  type="chat"
                  available={availability.chatAvailable}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
