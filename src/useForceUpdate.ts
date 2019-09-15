import { useState } from "react";

export function useForceUpdate() {
  const [, set] = useState(false);

  return () => set(c => !c);
}
