import FaviconModeDropdownSelector from "./FaviconModeDropdownSelector";
import FaviconPropertiesAllocator from "./FaviconPropertiesAllocator";
import editorStyle from "./favicon-editor.module.css";

export default function FaviconModeAndPropertiesSelector() {
  return (
    <div className={`w-full h-auto ${editorStyle.propertiesSelector}`}>
      <FaviconModeDropdownSelector />
      <div
        className={`bg-light bg-opacity-65 rounded-2xl shadow-lg p-4 flex items-center justify-center ${editorStyle.propertiesBox}`}
      >
        <FaviconPropertiesAllocator />
      </div>
    </div>
  );
}
