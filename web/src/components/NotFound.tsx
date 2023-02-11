import { AiOutlinePlus } from "react-icons/ai";
import { FaRegFolderOpen } from "react-icons/fa";
import { Button } from "./Button";

export const NotFound: React.FC = () => {
  return (
    <div className="flex page-content flex-2 align-items-center justify-content-center flex-column gap-2">
      <FaRegFolderOpen size={55} />
      <h3>No project is open</h3>
      <p>
        Keep things organized with a separate space for each one of your
        projects
      </p>
      <Button>
        <AiOutlinePlus /> Create project
      </Button>
    </div>
  );
};
