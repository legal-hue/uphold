"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

/**
 * Inline Calendly booking widget. Loads Calendly's script/stylesheet once and
 * initialises the widget into this element, so it also works after client-side
 * navigation (when the script is already present but hasn't re-scanned the DOM).
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current;
    if (!url || !parent) return;

    const init = () => {
      if (window.Calendly && parent) {
        parent.innerHTML = "";
        window.Calendly.initInlineWidget({ url, parentElement: parent });
      }
    };

    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    if (window.Calendly) {
      init();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", init, { once: true });
    }

    return () => {
      parent.innerHTML = "";
    };
  }, [url]);

  return (
    <div
      ref={ref}
      style={{ minWidth: "320px", height: "700px" }}
      aria-label="Calendly booking calendar"
    />
  );
}
