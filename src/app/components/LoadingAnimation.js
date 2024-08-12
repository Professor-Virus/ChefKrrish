import React from "react";
import { helix } from "ldrs";

export default function () {
  helix.register();

  // Default values shown
  return (
    <div>
      <l-helix size="65" speed="2.5" color="black"></l-helix>
    </div>
  );
}
