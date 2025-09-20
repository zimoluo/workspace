"use client";

import { useNotebook } from "@/components/contexts/NotebookContext";
import { useSettings } from "@/components/contexts/SettingsContext";
import { formatDate } from "@/lib/dateUtil";
import { useEffect, useRef } from "react";
import notebookStyle from "./notebook.module.css";

const trimTitleText = (text: string, maxLength: number = 16): string => {
  if (text.length <= maxLength) {
    return text;
  }

  let trimmedText = text.slice(0, maxLength);

  const lastSpaceIndex = trimmedText.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    trimmedText = trimmedText.slice(0, lastSpaceIndex);
  }

  trimmedText = trimmedText.replace(/[ .]+$/, "");

  return `${trimmedText}...`;
};

export default function NotebookMenu() {
  const { settings, updateSettings } = useSettings();
  const { isMenuOpen, shouldScrollToTop, setShouldScrollToTop } = useNotebook();
  const { notebookData, notebookIndex } = settings;
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldScrollToTop) {
      if (window.innerWidth >= 768) {
        menuRef.current?.scrollTo(0, 0);
      } else {
        menuRef.current?.scrollTo(menuRef.current?.scrollWidth || 0, 0);
      }
      setShouldScrollToTop(false);
    }
  }, [menuRef, shouldScrollToTop]);

  return (
    <div
      ref={menuRef}
      className={`${
        isMenuOpen ? "" : "hidden"
      } overflow-y-auto bg-light bg-opacity-80 rounded-2xl px-2.5 py-1 shadow-lg ${
        notebookStyle.menuContainer
      }`}
    >
      <div className={`${notebookStyle.menu} w-48`}>
        {notebookData.map((notebook, index) => {
          const isSelected = index === notebookIndex;
          return (
            <button
              key={index}
              className={`${
                isSelected
                  ? "bg-saturated bg-opacity-80 text-light"
                  : "bg-pastel bg-opacity-50"
              } w-full h-14 rounded-lg text-start pt-3 pb-1.5 px-3 flex flex-col`}
              onClick={() =>
                updateSettings({ ...settings, notebookIndex: index })
              }
            >
              <p className="font-bold flex-grow leading-none">
                {notebook.content
                  ? trimTitleText(notebook.content.split("\n")[0].trim(), 13)
                  : "Untitled"}
              </p>
              <p className="text-right text-sm w-full leading-none">
                {formatDate(notebook.lastEditedDate)}
              </p>
            </button>
          );
        })}
        <div
          className="flex-grow w-0 pointer-events-none select-none touch-none"
          aria-hidden="true"
        />
      </div>
      <div
        className="h-2 w-0 pointer-events-none select-none touch-none"
        aria-hidden="true"
      />
    </div>
  );
}
