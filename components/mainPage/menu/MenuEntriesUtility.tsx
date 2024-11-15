"use client";

import { Fragment } from "react";
import MenuUtilityButton from "./MenuUtilityButton";

export default function MenuEntriesUtility() {
  return (
    ["resetSettings", "resetProfiles", "resetAllData"] as MenuUtility[]
  ).map((item, index) => (
    <Fragment key={item}>
      {index !== 0 && (
        <div className="border-primary border-0.4 border-opacity-20" />
      )}
      <MenuUtilityButton
        utility={item}
        needsConfirm={[
          "resetSettings",
          "resetProfiles",
          "resetAllData",
        ].includes(item)}
      />
    </Fragment>
  ));
}
