"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";
import { useWindowAction } from "@/components/contexts/WindowActionContext";
import { useEntryWindow } from "../contexts/EntryWindowContext";

interface Props {
  children?: ReactNode;
  menuButtonRef: RefObject<HTMLButtonElement>;
  direction?: "left" | "right";
  maxWidth?: string;
}

export default function WindowSlideMenuWrapper({
  children,
  menuButtonRef,
  direction = "left",
  maxWidth = "26rem",
}: Props) {
  const { isMenuOpen, slug, setIsMenuOpen } = useEntryWindow();
  const { windowContentRef } = useWindowAction();
  const menuWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        event.preventDefault();
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!slug) {
        return;
      }

      const target = event.target as Node;

      if (
        target &&
        (target === menuButtonRef.current ||
          (windowContentRef &&
            windowContentRef.current &&
            !windowContentRef.current.contains(target)))
      ) {
        return;
      }

      if (typeof window !== "undefined" && window.innerWidth < 768) {
        return;
      }

      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen, slug]);

  return (
    <aside
      aria-hidden={!isMenuOpen}
      ref={menuWrapperRef}
      style={
        slug
          ? {
              width: `min(100%, ${maxWidth})`,
            }
          : undefined
      }
      className={`fixed top-0 ${
        direction === "left" ? "left-0" : "right-0"
      } z-10 h-full ${
        slug
          ? `${
              direction === "left" ? "rounded-r-xl" : "rounded-l-xl"
            } bg-widget-100 backdrop-blur-xl`
          : "w-full bg-widget-90"
      } shadow-lg transition-all duration-200 ease-out ${
        isMenuOpen
          ? `backdrop-blur-2xl translate-x-0`
          : `${
              direction === "left" ? "-translate-x-full" : "translate-x-full"
            } invisible`
      }`}
    >
      {children}
    </aside>
  );
}
