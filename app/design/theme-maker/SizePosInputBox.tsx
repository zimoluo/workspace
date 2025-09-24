import { useInputParser } from "@/lib/helperHooks";
import editorStyle from "./mode-data-editor.module.css";

export default function SizePosInputBox({
  value,
  setValue,
  isValid,
  formatValue,
}: InputParserData<number>) {
  const [storedValue, handleChange] = useInputParser<number>({
    value,
    setValue,
    isValid,
    formatValue,
  });

  return (
    <div className="w-full">
      <input
        value={storedValue}
        onChange={handleChange}
        className={`bg-none bg-pastel bg-opacity-65 shadow-sm w-full h-auto rounded-md px-1 py-0.5 text-center ${editorStyle.input}`}
      />
    </div>
  );
}
