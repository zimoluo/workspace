"use client";

import { ReactNode, useRef } from "react";
import MenuSlideWrapper from "./menu/MenuSlideWrapper";
import { useMenuControl } from "../contexts/MenuControlContext";
import MenuIcon from "../assets/entries/MenuIcon";
import NavbarWindowButton from "./NavbarWindowButton";
import menuStyle from "./menu/menu.module.css";

interface Props {
  children?: ReactNode;
  menuContent?: ReactNode;
}

export default function NavbarWrapper({ children, menuContent }: Props) {
  const { isSideMenuExpanded, setIsSideMenuExpanded } = useMenuControl();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setIsSideMenuExpanded(true);
  };

  const restoreNavbar = () => {
    setIsSideMenuExpanded(false);
  };

  return (
    <>
      <div
        className={`fixed top-2.5 right-[84px] rounded-t-full transition-transform duration-200 ease-[cubic-bezier(0.37,0.01,0.11,0.93)] z-30 ${
          isSideMenuExpanded ? "translate-x-[-24.75rem]" : "translate-x-0"
        }`}
        ref={navbarRef}
      >
        <div
          className={`${
            isSideMenuExpanded ? menuStyle.squeezeEntireNavbarWhenMenuOpen : ""
          }`}
        >
          <NavbarWindowButton />
        </div>
      </div>
      <MenuSlideWrapper
        onClose={restoreNavbar}
        menuButtonRef={menuButtonRef}
        navbarRef={navbarRef}
      >
        {menuContent}
      </MenuSlideWrapper>
      <div
        className={`fixed top-2.5 right-4 z-30 h-13 w-13 pointer-events-none select-none transition-[filter,opacity] duration-200 ease-out ${
          isSideMenuExpanded ? "opacity-0 blur-[8px]" : "opacity-100"
        }`}
      >
        <div className="w-full h-full shadow-lg rounded-full bg-light/65 backdrop-blur-sm border-reflect-light" />
      </div>
      <div className="fixed top-2.5 right-4 z-30 h-13 w-13">
        <button
          className="w-full h-full flex items-center justify-center rounded-full"
          onClick={isSideMenuExpanded ? restoreNavbar : openMenu}
          ref={menuButtonRef}
        >
          <MenuIcon
            className="h-7 w-7 pointer-events-none"
            isActive={isSideMenuExpanded}
          />
        </button>
      </div>
    </>
  );
}
