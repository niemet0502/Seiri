import { useContext } from "react";
import { BsListTask } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { currentFeatureContext } from "../../provider/currentFeatureProvider";
import { FeatureEnum } from "../../types";
import { IconButton } from "../Button";

export const Features: React.FC = () => {
  const { setFeature, feature } = useContext(currentFeatureContext);
  return (
    <div className="feature-sidebar">
      <div className="menu-icon">
        <IconButton
          handler={() => setFeature(FeatureEnum.Task)}
          active={feature === FeatureEnum.Task ? "active" : null}
        >
          <BsListTask />
        </IconButton>

        <IconButton
          handler={() => setFeature(FeatureEnum.Note)}
          active={feature === FeatureEnum.Note ? "active" : null}
        >
          <SlNote />
        </IconButton>
      </div>

      <div className="menu-icon">
        <IconButton>
          <FiSettings />
        </IconButton>
      </div>
    </div>
  );
};
