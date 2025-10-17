"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";
import menuStyle from "./menu.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  children?: ReactNode;
}

export default function MenuSlideWrapper({
  isOpen,
  onClose,
  children,
  menuButtonRef,
}: Props) {
  const menuWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateBodyOverflow = () => {
      if (mediaQuery.matches && isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    updateBodyOverflow();
    mediaQuery.addEventListener("change", updateBodyOverflow);

    return () => {
      document.body.style.overflow = "";
      mediaQuery.removeEventListener("change", updateBodyOverflow);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        target &&
        target instanceof HTMLElement &&
        target === menuButtonRef.current
      ) {
        return;
      }

      if (typeof window !== "undefined" && window.innerWidth < 768) {
        return;
      }

      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(target) &&
        isOpen
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-40 h-dynamic-screen ${
          menuStyle.menuBlurDimension
        } backdrop-blur-[9px] ${
          isOpen ? "opacity-100" : "opacity-0"
        } pointer-events-none select-none transition-opacity duration-300 ease-out`}
      />
      <aside
        aria-hidden={!isOpen}
        ref={menuWrapperRef}
        style={{
          transition:
            "transform 0.3s cubic-bezier(.37,.01,.11,.93), opacity 0.2s ease-out, visibility 0.3s ease-out, filter 0.3s ease-out",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 1.5rem, black 3.5rem, black calc(100% - 2.9rem), transparent calc(100% - 1.6rem), transparent 100%)",
        }}
        className={`fixed top-0 right-0 z-40 h-dynamic-screen ${
          menuStyle.menuSlideWidth
        } p-2 ${
          isOpen
            ? `opacity-100 translate-y-0`
            : "invisible opacity-0 -translate-y-16 blur-[6px]"
        }`}
      >
        <div className="w-full h-full">{children}</div>
      </aside>
      <div
        style={{
          transition:
            "transform 0.3s cubic-bezier(.37,.01,.11,.93), opacity 0.2s ease-out",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 2.6rem, transparent 3.8rem, transparent calc(100% - 2.9rem), black calc(100% - 2.4rem), black 100%)",
        }}
        className={`fixed top-0 right-0 z-40 h-dynamic-screen ${
          menuStyle.menuBlurDimension
        } backdrop-blur-[4px] ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
        } pointer-events-none select-none`}
      />
    </>
  );
}
