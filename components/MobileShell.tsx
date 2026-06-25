import type { ReactNode } from "react";
import OrientalBackdrop from "./OrientalBackdrop";

interface MobileShellProps {
  children: ReactNode;
}

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="app-shell">
      <OrientalBackdrop />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
