import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "./Button";

export const DIALOG_CLOSED_REASON = "DIALOG_CLOSED_REASON";

const dialogContainer = document.createElement("div");

document.body.appendChild(dialogContainer);

export const Dialog: React.FC<{
  children: React.ReactNode;
  width?: string;
  title: string;
  onClose: () => void;
}> = ({ children, width = "600px", title, onClose }) => {
  const backdropRef = useRef<any>();
  const [mouseDownEvent, setMouseDownEvent] = useState<MouseEvent | null>(null);

  return createPortal(
    <div
      className="dialog"
      ref={backdropRef}
      onMouseDown={(event: any) => {
        if (event.target === backdropRef.current) {
          setMouseDownEvent(event);
        }
      }}
      onMouseUp={(event: any) => {
        if (event.target === backdropRef.current && mouseDownEvent) {
          onClose();
        }
        setMouseDownEvent(null);
      }}
    >
      <div
        className="content"
        style={{ width: width, transform: "translateY(0)" }}
      >
        <div className="header flex justify-content-between">
          {title}
          <IconButton handler={onClose}>
            <AiOutlineClose />
          </IconButton>
        </div>
        <div className="body" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>,
    dialogContainer
  );
};
