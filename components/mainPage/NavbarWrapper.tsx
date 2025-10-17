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
        className={`fixed top-5 right-5 z-40 transition-transform duration-300 ease-out ${
          menuOpen
            ? "-translate-x-1 translate-y-1"
            : "translate-x-0 translate-y-0"
        }`}
        isOpen={menuOpen}
        onClick={menuOpen ? restoreNavbar : openMenu}
        buttonRef={menuButtonRef}
      />
    </>
  );
}
