import DisplayFavicon from "@/components/assets/DisplayFavicon";

export default function MenuEntriesTitle() {
  return (
    <div className="flex items-center w-full relative h-10">
      <div className="h-10 aspect-square relative">
        <DisplayFavicon className="h-full w-full aspect-square rounded-full" />
      </div>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="text-xl font-bold ">Workspace</div>
      </div>
    </div>
  );
}
