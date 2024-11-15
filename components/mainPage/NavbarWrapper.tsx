"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";
import MenuSlideWrapper from "./menu/MenuSlideWrapper";
import ExpandMenuButton from "../widgets/ExpandMenuButton";

interface Props {
  children?: ReactNode;
  menuContent?: ReactNode;
}

export default function NavbarWrapper({ children, menuContent }: Props) {
  const { settings } = useSettings();

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarExpanded, setNavbarExpanded] = useState(true);

  const scrollThreshold = 4;

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setNavbarExpanded(true);
    setMenuOpen(true);
  };

  const restoreNavbar = () => {
    setNavbarExpanded(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    setNavbarExpanded(true);
    setScrollY(window.scrollY);
  }, []);

  return (
    <>
      <MenuSlideWrapper
        onClose={restoreNavbar}
        isOpen={menuOpen}
        menuButtonRef={menuButtonRef}
      >
        {menuContent}
      </MenuSlideWrapper>
      <ExpandMenuButton
        className={`fixed top-3 right-4 z-40 ${
          navbarExpanded || menuOpen ? "" : "-translate-y-14"
        }`}
        isOpen={menuOpen}
        onClick={menuOpen ? restoreNavbar : openMenu}
        buttonRef={menuButtonRef}
      />
    </>
  );
}
