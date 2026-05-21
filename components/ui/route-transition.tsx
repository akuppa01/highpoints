"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type RouteTransitionContextValue = {
  beginTransition: () => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(
  null
);

function SummitLoader({
  label = "Loading next route",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "route-loader-card",
        compact ? "px-5 py-4" : "px-6 py-5 md:px-7 md:py-6"
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="route-loader-mark" aria-hidden="true">
        <svg
          viewBox="0 0 64 64"
          className="h-14 w-14 md:h-16 md:w-16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 50L28 16L38 34L46 22L54 50"
            className="route-loader-outline"
          />
          <path
            d="M10 50L28 16L38 34L46 22L54 50"
            className="route-loader-trace"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="font-display text-xl tracking-tight text-text-primary">
          Highpoints
        </p>
        <p className="mt-1 text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
          {label}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden="true">
        <span className="route-loader-dot delay-0" />
        <span className="route-loader-dot delay-150" />
        <span className="route-loader-dot delay-300" />
      </div>
    </div>
  );
}

function RouteTransitionOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={cn("route-loader-overlay", visible && "is-visible")}
    >
      <SummitLoader label="Opening next view" />
    </div>
  );
}

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<number | null>(null);

  const clearShowTimer = useCallback(() => {
    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  }, []);

  const finishTransition = useCallback(() => {
    clearShowTimer();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(false);
      });
    });
  }, [clearShowTimer]);

  const beginTransition = useCallback(() => {
    clearShowTimer();
    showTimerRef.current = window.setTimeout(() => {
      setVisible(true);
    }, 80);
  }, [clearShowTimer]);

  useEffect(() => {
    finishTransition();
  }, [pathname, finishTransition]);

  const value = useMemo(
    () => ({
      beginTransition,
    }),
    [beginTransition]
  );

  return (
    <RouteTransitionContext.Provider value={value}>
      {children}
      <RouteTransitionOverlay visible={visible} />
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext);

  if (!context) {
    throw new Error("useRouteTransition must be used inside RouteTransitionProvider");
  }

  return context;
}

export { SummitLoader };
