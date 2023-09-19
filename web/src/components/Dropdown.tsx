import { ReactElement, useEffect, useRef, useState } from "react";

export const Dropdown: React.FC<{
  trigger: (toggle: () => void, open: boolean) => ReactElement;
  right?: string;
  left?: string;
  top?: string;
  children: React.ReactNode;
  width?: string;
}> = ({
  trigger,
  children,
  left = "-20px",
  right = "0px",
  top = "20px",
  width = "120px",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive((prevVal) => !prevVal);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsActive(!isActive);
      }
    };

    // If the dropdown is open then listen for clicks
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      {trigger(onClick, isActive)}
      <div
        className="dropdown flex flex-column"
        style={{
          opacity: isActive ? 1 : 0,
          visibility: isActive ? "visible" : "hidden",
          transform: isActive ? "translateY(0)" : "translateY(-20px)",
          right: right,
          left: left,
          top: top,
          width: width,
        }}
        onClick={() => setIsActive(false)}
      >
        {children}
      </div>
    </div>
  );
};
