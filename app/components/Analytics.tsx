"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function Analytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    fetch("/api/analytics-config")
      .then((response) => response.ok ? response.json() : null)
      .then((config: { key?: string; host?: string } | null) => {
        const key = config?.key;
        const host = config?.host || "https://us.i.posthog.com";
        if (!key || posthog.__loaded) return;
        posthog.init(key, {
          api_host: host,
          person_profiles: "identified_only",
          autocapture: true,
          capture_pageview: true,
          capture_pageleave: true,
          disable_session_recording: true,
          persistence: "localStorage",
          respect_dnt: true,
        });
      })
      .catch(() => {});

    const clickHandler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-analytics-label]");
      if (!target) return;
      posthog.capture("music_explorer_action", {
        label: target.dataset.analyticsLabel,
        category: target.dataset.analyticsCategory || "navigation",
      });
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  return null;
}
