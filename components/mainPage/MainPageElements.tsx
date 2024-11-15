import BackgroundAnimation from "./BackgroundAnimation";
import BackgroundImage from "./BackgroundImage";
import NavbarWrapper from "./NavbarWrapper";
import WindowButton from "./WindowButton";
import MenuEntriesLayout from "./menu/MenuEntriesLayout";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function MainPageElements({ children, className = "" }: Props) {
  return (
    <>
      <BackgroundImage />
      <BackgroundAnimation />
      <NavbarWrapper menuContent={<MenuEntriesLayout />} />
      <WindowButton />
      <main className={className}>{children}</main>
      <div
        className="select-none pointer-events-none flex-grow"
        aria-hidden="true"
      />
    </>
  );
}
