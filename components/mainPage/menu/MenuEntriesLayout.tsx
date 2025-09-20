import MenuEntriesInfo from "./MenuEntriesInfo";
import MenuEntriesSettings from "./MenuEntriesSettings";
import MenuEntriesTitle from "./MenuEntriesTitle";
import MenuEntriesUtility from "./MenuEntriesUtility";

export default function MenuEntriesLayout() {
  return (
    <div className="h-full w-full overflow-y-auto px-4 pb-4 rounded-[2rem]">
      <div className="rounded-full w-full bg-light bg-opacity-65 shadow-lg px-3 py-3 mt-16 mb-8 flex items-center">
        <MenuEntriesTitle />
      </div>

      <MenuEntriesSettings />

      <div className="rounded-2xl w-full bg-light bg-opacity-65 shadow-lg px-6 py-0 mb-4 text-lg">
        <MenuEntriesUtility />
      </div>

      <div className="rounded-2xl w-full bg-light bg-opacity-65 shadow-lg px-6 py-0 text-lg">
        <MenuEntriesInfo />
      </div>
    </div>
  );
}
