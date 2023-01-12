import { BsListTask } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SlNote } from "react-icons/sl";

export const Features: React.FC = () => {
  return (
    <div className="feature-sidebar">
      <div className="menu-icon">
        <div className="flex">
          <BsListTask />
        </div>

        <div className="flex">
          <SlNote />
        </div>
      </div>

      <div className="menu-icon">
        <div className="flex">
          <FiSettings />
        </div>
      </div>
    </div>
  );
};
