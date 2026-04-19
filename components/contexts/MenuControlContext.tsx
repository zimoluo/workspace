"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useState,
  useMemo,
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
    }
  | undefined
>(undefined);

export function MenuControlProvider({ children }: Props) {
  const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(false);

  const toggleSideMenuExpansion = useCallback(() => {
    setIsSideMenuExpanded((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      isSideMenuExpanded,
      setIsSideMenuExpanded,
      toggleSideMenuExpansion,
    }),
    [isSideMenuExpanded, toggleSideMenuExpansion],
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
