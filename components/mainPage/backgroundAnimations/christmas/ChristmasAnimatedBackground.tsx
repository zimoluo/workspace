import polkaStyle from "./polka.module.css";

export default function ChristmasAnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className={`inset-0 fixed -z-20 w-screen h-screen ${polkaStyle.polka} pointer-events-none select-none`}
    />
  );
}
