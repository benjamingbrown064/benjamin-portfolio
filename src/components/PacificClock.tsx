"use client";

import { useEffect, useState } from "react";

type PacificClockProps = {
  hour12?: boolean;
  className?: string;
};

export function PacificClock({ hour12 = false, className }: PacificClockProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12,
      timeZone: "America/Los_Angeles",
    });
    function tick() {
      setTime(fmt.format(new Date()));
    }
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, [hour12]);

  return <span className={className}>{time || (hour12 ? "0:00 AM" : "00:00")}</span>;
}
