import DisplayFavicon from "../images/DisplayFavicon";
import NavbarButton from "./NavbarButton";
import Link from "next/link";
import navbarStyle from "./navbar.module.css";
import React from "react";

export default function NavbarContent() {
  return (
    <nav className="px-4 h-full w-full flex items-center justify-between">
      <div className="shrink-0">
        <Link href="/">
          <DisplayFavicon className="h-6 w-auto transition-all duration-300 hover:scale-110 cursor-pointer" />
        </Link>
      </div>
      <div
        className={`grid grid-cols-4 gap-x-1 md:gap-x-2 shrink-0 ${navbarStyle["navbar-spacing"]}`}
      >
        {["photos", "blog", "projects", "about"].map((item) => (
          <NavbarButton
            key={item}
            item={item as "photos" | "blog" | "projects" | "about"}
          />
        ))}
      </div>
      <div
        className="shrink-0 h-6 w-auto aspect-square select-none pointer-events-none"
        aria-hidden="true"
      />
    </nav>
  );
}
