import MenuEntriesInfo from "./MenuEntriesInfo";
import MenuEntriesSettings from "./MenuEntriesSettings";
import MenuEntriesTitle from "./MenuEntriesTitle";
import MenuEntriesUtility from "./MenuEntriesUtility";

export default function MenuEntriesLayout() {
  return (
    <div className="h-full w-full overflow-y-auto px-4 pb-12">
      <div className="rounded-full w-full bg-light bg-opacity-80 shadow-sm px-3 py-3 mt-16 mb-8 flex items-center border border-highlight-light border-opacity-15">
        <MenuEntriesTitle />
      </div>

      <MenuEntriesSettings cornerRadius="2rem" />

      <div className="rounded-[2rem] w-full bg-light bg-opacity-80 shadow-sm px-6 py-0 mb-4 text-lg border border-highlight-light border-opacity-15">
        <MenuEntriesUtility />
      </div>

      <div className="rounded-[2rem] w-full bg-light bg-opacity-80 shadow-sm px-6 py-0 text-lg border border-highlight-light border-opacity-15">
        <MenuEntriesInfo />
      </div>
    </div>
  );
}
