"use client";

import { useSettings } from "../contexts/SettingsContext";
import windowPickerStyle from "./window-picker.module.css";
import WindowPickerEntry from "./WindowPickerEntry";

interface Props {
  sections?: WindowPickerSection[];
}

const defaultSections: WindowPickerSection[] = [
  {
    title: "Workspace",
    entries: [
      "notebook",
      "themeMakerToolset",
      "calculator",
      "stickyNotes",
      "signalGenerator",
      "faviconWidget",
      "settingsPanel",
      "zimoWebInWindow",
      "wikipedia",
      "blank",
    ],
  },
];

const EntrySection = ({ title, entries }: WindowPickerSection) => (
  <>
    <h2 className="font-bold text-lg">{title}</h2>
    <div className={`w-full ${windowPickerStyle.container}`}>
      {entries.map((entry, index) => (
        <WindowPickerEntry entry={entry} key={index}></WindowPickerEntry>
      ))}
    </div>
  </>
);

export default function WindowPicker({ sections = defaultSections }: Props) {
  const { settings } = useSettings();

  const processedSections = structuredClone(sections);

  if (settings.enableWindowDebugger) {
    processedSections[0].entries.push("debugger");
  }

  return (
    <div className="w-full h-full px-8 py-6 bg-widget-80">
      <div className="w-full h-full overflow-y-auto space-y-6">
        {processedSections.map((section, index) => (
          <EntrySection
            key={index}
            title={section.title}
            entries={section.entries}
          />
        ))}
      </div>
    </div>
  );
}
