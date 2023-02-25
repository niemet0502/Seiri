import { useContext } from "react";
import { BsListTask } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { currentFeatureContext } from "../../provider/currentFeatureProvider";
import { CurrentUserContext } from "../../provider/userProvider";
import { FeatureEnum } from "../../types";
import { IconButton } from "../Button";
import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";

export const Features: React.FC = () => {
  const { updateCurrentFeature, feature } = useContext(currentFeatureContext);
  const { logout } = useContext(CurrentUserContext);
  return (
    <div className="feature-sidebar">
      <div>
        <IconButton
          handler={() => updateCurrentFeature(FeatureEnum.Task)}
          active={feature === FeatureEnum.Task ? "active" : null}
        >
          <BsListTask />
        </IconButton>

        <IconButton
          handler={() => updateCurrentFeature(FeatureEnum.Note)}
          active={feature === FeatureEnum.Note ? "active" : null}
        >
          <SlNote />
        </IconButton>
      </div>

      <div>
        <Dropdown
          left="50px"
          right="-250px"
          top="-45px"
          trigger={(toggle) => (
            <IconButton handler={toggle}>
              <FiSettings />
            </IconButton>
          )}
        >
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem handler={logout}>Sign out</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};
