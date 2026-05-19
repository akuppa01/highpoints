"use client";

import Link, { type LinkProps } from "next/link";
import {
  forwardRef,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
} from "react";
import { useRouteTransition } from "@/components/ui/route-transition";

type IntentLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    hoverPrefetch?: boolean;
    pendingHint?: boolean;
  };

export const IntentLink = forwardRef<HTMLAnchorElement, IntentLinkProps>(
  function IntentLink(
    {
      hoverPrefetch = false,
      pendingHint = false,
      onMouseEnter,
      onTouchStart,
      children,
      className,
      prefetch,
      ...props
    },
    ref
  ) {
    const [warmed, setWarmed] = useState(!hoverPrefetch);
    const [clicked, setClicked] = useState(false);
    const resetTimerRef = useRef<number | null>(null);
    const { beginTransition } = useRouteTransition();
    const resolvedPrefetch = useMemo(() => {
      if (prefetch !== undefined) return prefetch;
      if (!hoverPrefetch) return undefined;
      return warmed ? null : false;
    }, [hoverPrefetch, prefetch, warmed]);

    return (
      <Link
        ref={ref}
        {...props}
        prefetch={resolvedPrefetch}
        className={className}
        onMouseEnter={(event) => {
          setWarmed(true);
          onMouseEnter?.(event);
        }}
        onTouchStart={(event) => {
          setWarmed(true);
          onTouchStart?.(event);
        }}
        onClick={(event) => {
          setClicked(true);
          beginTransition();
          if (resetTimerRef.current) {
            window.clearTimeout(resetTimerRef.current);
          }
          resetTimerRef.current = window.setTimeout(() => {
            setClicked(false);
          }, 1200);
          props.onClick?.(event);
        }}
      >
        {children}
        {pendingHint ? (
          <span
            aria-hidden="true"
            className={`link-hint ${clicked ? "is-pending" : ""}`}
          />
        ) : null}
      </Link>
    );
  }
);
