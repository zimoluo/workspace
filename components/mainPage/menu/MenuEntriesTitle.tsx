import DisplayFavicon from "@/components/assets/DisplayFavicon";

export default function MenuEntriesTitle() {
  return (
    <div className="flex items-center w-full">
      <div className="p-1 h-12 md:h-16 aspect-square">
        <DisplayFavicon className="h-full w-full aspect-square rounded-full" />
      </div>
      <div className="text-xl md:text-2xl font-bold ml-3.5">Workspace</div>
    </div>
  );
}
