import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { IconButton } from "./Button";

export const Toast: React.FC<{
  id?: number;
  title: string;
  message: string;
  onClose?: (id: number) => void;
}> = ({ message, title, id, onClose }) => {
  return (
    <div className="toast-message">
      <div className="flex justify-content-between align-items-center">
        <h5 className="flex align-items-center gap-1">
          <span>
            <AiOutlineCheck />
          </span>
          {title}
        </h5>
        <IconButton handler={onClose && id ? () => onClose(id) : undefined}>
          <AiOutlineClose />
        </IconButton>
      </div>
      <div className="mt-1" style={{ fontSize: "12px", paddingLeft: "20px" }}>
        {message}
      </div>
    </div>
  );
};
