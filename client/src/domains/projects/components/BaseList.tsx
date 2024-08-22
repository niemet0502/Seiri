import { useContext } from "react";
import { currentFeatureContext } from "../../../provider/currentFeatureProvider";
import { FeatureEnum } from "../../../types";
import { NotesList } from "../../notes/pages/NotesList";
import { TasksList } from "../../tasks/pages/TasksList";

const BaseList: React.FC = () => {
  const { feature } = useContext(currentFeatureContext);

  return feature === FeatureEnum.Note ? <NotesList /> : <TasksList />;
};

export default BaseList;
