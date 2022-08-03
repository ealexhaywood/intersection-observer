import React, { useEffect, useMemo, useRef, useState, useTransition } from "react";

export default function ListItem({ observe, concurrent, children }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          // Should only be 1 entry...
          const isIntersecting = entries.some((entry) => entry.isIntersecting);

          if (concurrent) {
            startTransition(() => {
              setIsVisible(isIntersecting);
            });
          } else {
            setIsVisible(isIntersecting);
          }
        },
        {
          root: document.getElementById("scrollable-list"),
        }
      ),
    [concurrent]
  );

  useEffect(() => {
    if (elementRef) {
      if (observe) {
        observer.observe(elementRef.current);
      } else {
        observer.unobserve(elementRef.current);
      }
    }
  }, [observer, observe]);

  return (
    <li
      ref={elementRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        listStyleType: "none",
      }}
    >
      {observe ? (!isVisible || isPending ? "loading..." : children) : children}
    </li>
  );
}
