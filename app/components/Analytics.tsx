"use client";

import { useEffect } from "react";

type PostHogWindow = Window & {
  posthog?: {
    init: (key: string, options: Record<string, unknown>) => void;
    capture?: (event: string, properties?: Record<string, unknown>) => void;
  };
};

export function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    if (!key || typeof window === "undefined") return;

    const win = window as PostHogWindow;
    if (win.posthog) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `${host}/static/array.js`;
    script.onload = () => {
      win.posthog?.init(key, {
        api_host: host,
        person_profiles: "identified_only",
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
        disable_session_recording: true,
        persistence: "localStorage",
        respect_dnt: true,
      });
    };
    document.head.appendChild(script);

    const clickHandler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-analytics-label]");
      if (!target) return;
      win.posthog?.capture?.("music_explorer_action", {
        label: target.dataset.analyticsLabel,
        category: target.dataset.analyticsCategory || "navigation",
      });
    };
    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, []);

  return null;
}
