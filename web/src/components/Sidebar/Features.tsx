import { useContext, useState } from "react";
import { BsListTask } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { SettingsModal } from "../../pages/Settings/SettingsModal";
import { currentFeatureContext } from "../../provider/currentFeatureProvider";
import { CurrentUserContext } from "../../provider/userProvider";
import { FeatureEnum } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { IconButton } from "../Button";
import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";

export const Features: React.FC = () => {
  const { updateCurrentFeature, feature } = useContext(currentFeatureContext);
  const { logout } = useContext(CurrentUserContext);

  const [editSettingsHandler, setEditSettingsHandler] =
    useState<Deferred<void>>();

  const editSettings = async () => {
    const deferred = new Deferred<void>();

    setEditSettingsHandler(deferred);

    try {
      await deferred.promise;
    } catch (e) {
    } finally {
      setEditSettingsHandler(undefined);
    }
  };

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
          <DropdownItem handler={editSettings}>Settings</DropdownItem>
          <DropdownItem handler={logout}>Sign out</DropdownItem>
        </Dropdown>
      </div>

      {editSettingsHandler && <SettingsModal deferred={editSettingsHandler} />}
    </div>
  );
};
