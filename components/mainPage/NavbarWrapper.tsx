"use client";

import { ReactNode, useRef, useState } from "react";
import MenuSlideWrapper from "./menu/MenuSlideWrapper";
import ExpandMenuButton from "../widgets/ExpandMenuButton";

interface Props {
  children?: ReactNode;
  menuContent?: ReactNode;
}

export default function NavbarWrapper({ menuContent }: Props) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const restoreNavbar = () => {
    setMenuOpen(false);
  };

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
        className="fixed top-3 right-4 z-40"
        isOpen={menuOpen}
        onClick={menuOpen ? restoreNavbar : openMenu}
        buttonRef={menuButtonRef}
      />
    </>
  );
}
