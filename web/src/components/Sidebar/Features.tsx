import { BsListTask } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import { IconButton } from "../Button";

export const Features: React.FC = () => {
  return (
    <div className="feature-sidebar">
      <div className="menu-icon">
        <NavLink to="/t">
          <IconButton>
            <BsListTask />
          </IconButton>
        </NavLink>

        <NavLink to="/n">
          <IconButton>
            <SlNote />
          </IconButton>
        </NavLink>
      </div>

      <div className="menu-icon">
        <IconButton>
          <FiSettings />
        </IconButton>
      </div>
    </div>
  );
};
