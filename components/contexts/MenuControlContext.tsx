"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useState,
  useMemo,
  useRef,
  useCallback,
  use,
} from "react";

type Props = {
  children?: ReactNode;
};

export const MenuControlContext = createContext<
  | {
      isSideMenuExpanded: boolean;
      setIsSideMenuExpanded: Dispatch<SetStateAction<boolean>>;
      toggleSideMenuExpansion: () => void;
      sideMenuExpandedTrigger: boolean;
    }
  | undefined
>(undefined);

export function MenuControlProvider({ children }: Props) {
  const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(false);
  const [sideMenuExpandedTrigger, setSideMenuExpandedTrigger] = useState(false);

  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const triggerNavbarAnimation = useCallback(() => {
    setSideMenuExpandedTrigger(true);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setSideMenuExpandedTrigger(false);
    }, 200);
  }, []);

  const setIsSideMenuExpandedWithTrigger = useCallback(
    (value: SetStateAction<boolean>) => {
      setIsSideMenuExpanded((prev) => {
        const newValue = typeof value === "function" ? value(prev) : value;
        if (newValue !== prev) {
          triggerNavbarAnimation();
        }
        return newValue;
      });
    },
    [triggerNavbarAnimation]
  );

  const toggleSideMenuExpansion = useCallback(() => {
    setIsSideMenuExpandedWithTrigger((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      isSideMenuExpanded,
      setIsSideMenuExpanded: setIsSideMenuExpandedWithTrigger,
      toggleSideMenuExpansion,
      sideMenuExpandedTrigger,
    }),
    [
      isSideMenuExpanded,
      toggleSideMenuExpansion,
      sideMenuExpandedTrigger,
      setIsSideMenuExpandedWithTrigger,
    ]
  );

  return (
    <MenuControlContext value={contextValue}>{children}</MenuControlContext>
  );
}

export const useMenuControl = () => {
  const context = use(MenuControlContext);
  if (context === undefined) {
    throw new Error("useMenuControl must be used within a MenuControlProvider");
  }
  return context;
};
