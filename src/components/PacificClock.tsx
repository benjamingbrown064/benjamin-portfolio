"use client";

import { useEffect, useState } from "react";

export function PacificClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Los_Angeles",
    });
    function tick() {
      setTime(fmt.format(new Date()));
    }
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{time || "00:00"}</span>;
}
