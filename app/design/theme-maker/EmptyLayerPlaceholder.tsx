import NoSignIcon from "@/components/assets/entries/NoSignIcon";

export default function EmptyLayerPlaceholder() {
  return (
    <div className="w-full h-full rounded-2xl bg-light bg-opacity-65 shadow-lg flex items-center justify-center py-10 px-6 pointer-events-none select-none">
      <NoSignIcon className="opacity-40 h-16 w-auto aspect-square" />
    </div>
  );
}
