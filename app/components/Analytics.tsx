"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type ClickTrackingWindow = Window & {
  GatesClickTracking?: {
    install: (capture: (properties: Record<string, unknown>) => void, site: string) => () => void;
  };
};

export function Analytics() {
  useEffect(() => {
    let cancelled = false;
    let removeClicks: (() => void) | undefined;
    const win = window as ClickTrackingWindow;
    if (navigator.doNotTrack === "1") return;

    function installClicks() {
      if (cancelled) return;
      removeClicks = win.GatesClickTracking?.install((properties) => {
        posthog.capture("website_item_clicked", properties, { transport: "sendBeacon", send_instantly: true });
      }, "music-explorer");
    }

    fetch("/api/analytics-config")
      .then((response) => response.ok ? response.json() : null)
      .then((config: { key?: string; host?: string } | null) => {
        if (cancelled || !config?.key) return;
        if (!posthog.__loaded) posthog.init(config.key, {
          api_host: config.host || "https://us.i.posthog.com",
          person_profiles: "never",
          autocapture: false,
          capture_pageview: true,
          capture_pageleave: true,
          disable_session_recording: true,
          persistence: "localStorage",
          respect_dnt: true,
          before_send: (event) => {
            if (!event) return null;
            event.properties.site_key = "music-explorer";
            for (const key of Object.keys(event.properties)) {
              const value = event.properties[key];
              if (typeof value === "string" && /url|referrer/i.test(key) && /^https?:/.test(value)) {
                try { const url = new URL(value); event.properties[key] = url.origin + url.pathname; } catch { delete event.properties[key]; }
              }
            }
            return event;
          },
        });
        if (win.GatesClickTracking) installClicks();
        else {
          const script = document.createElement("script");
          script.src = "https://dennis-os-crm-production.up.railway.app/website-click-tracker.js";
          script.async = true;
          script.onload = installClicks;
          document.head.appendChild(script);
        }
      })
      .catch(() => {});

    return () => { cancelled = true; removeClicks?.(); };
  }, []);

  return null;
}
