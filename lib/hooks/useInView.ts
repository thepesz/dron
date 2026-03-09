"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Root margin for early/late trigger (e.g. "-50px") */
  margin?: string;
  /** Only trigger once (default: true) */
  once?: boolean;
}

/**
 * Lightweight Intersection Observer hook.
 * Returns a ref and a boolean indicating whether the element is in view.
 * Replaces Framer Motion's whileInView for simple entrance animations,
 * avoiding extra DOM wrapper nodes and reducing JS bundle size.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  margin = "-50px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, once]);

  return { ref, isInView };
}
