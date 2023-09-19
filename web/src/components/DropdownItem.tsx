import { MouseEventHandler } from "react";

export const DropdownItem: React.FC<{
  children: React.ReactNode;
  handler?: MouseEventHandler;
}> = ({ children, handler }) => {
  return (
    <button onClick={handler} className="dropdown-item gap-1">
      {children}
    </button>
  );
};
