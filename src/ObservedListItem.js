import React, { useEffect, useMemo, useRef, useState, useTransition } from "react";

export default function ListItem({ concurrent, children }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
    const element = elementRef.current;

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [observer]);

  // If we're using concurrent rendering, loading is when we're not visible or pending transition
  const isLoading = concurrent ? !isVisible || isPending : !isVisible;

  return (
    <li
      ref={elementRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "50px",
        justifyContent: "center",
        listStyleType: "none",
      }}
    >
      {isLoading ? "loading..." : children}
      {!isLoading && (
        <>
          <button onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "Collapse" : "Expand"}
          </button>
          <div
            style={{
              height: expanded ? "25px" : 0,
              transition: "height 0.2s ease-in-out",
              overflow: "hidden",
            }}
          >
            Check it out!
          </div>
        </>
      )}
    </li>
  );
}
