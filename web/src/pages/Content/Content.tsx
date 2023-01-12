import { AiOutlinePlus } from "react-icons/ai";
import { Features } from "../../container/Features";

export const Content: React.FC = () => {
  return (
    <div className="content-wrapper flex">
      <Features />
      <div className="project-sidebar">
        <div className="flex">
          Projects
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};
