import DisplayFavicon from "@/components/assets/DisplayFavicon";

export default function MenuEntriesTitle() {
  return (
    <div className="flex items-center w-full relative h-12">
      <div className="h-12 w-12 py-0.5 px-0.5 shrink-0 aspect-square relative">
        <DisplayFavicon className="h-11 w-11 aspect-square rounded-full" />
      </div>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="text-xl font-bold ">Workspace</div>
      </div>
    </div>
  );
}
