import React from "react";

export const escape = (
  action: React.Dispatch<React.SetStateAction<boolean>>
) => {
  document.addEventListener(
    "keyup",
    (e) => {
      if (e.key === "Escape") {
        action && action(false);
      }
    },
    false
  );
};
