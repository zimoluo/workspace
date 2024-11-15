import MenuEntriesSettings from "./MenuEntriesSettings";
import MenuEntriesUtility from "./MenuEntriesUtility";

export const menuNavigationItems = [
  "home",
  "photos",
  "blog",
  "projects",
  "about",
  "design",
  "themeMaker",
  "notebook",
  "management",
];

export default function MenuEntriesLayout() {
  return (
    <div className="h-full w-full overflow-y-auto px-6 md:px-8 py-8">
      <div className="rounded-2xl w-full bg-light bg-opacity-80 shadow-lg px-6 pt-4 pb-6 my-8 text-lg md:text-xl grid grid-cols-1 gap-4">
        <MenuEntriesSettings />
      </div>

      <div className="rounded-2xl w-full bg-light bg-opacity-80 shadow-lg px-6 py-0 my-8 text-lg md:text-xl">
        <MenuEntriesUtility />
      </div>
    </div>
  );
}
