import { useContext } from "react";
import { TasksList } from "../../../pages/Tasks/TasksList";
import { currentFeatureContext } from "../../../provider/currentFeatureProvider";
import { FeatureEnum } from "../../../types";
import { NotesList } from "../../notes/pages/NotesList";

const BaseList: React.FC = () => {
  const { feature } = useContext(currentFeatureContext);

  return feature === FeatureEnum.Note ? <NotesList /> : <TasksList />;
};

export default BaseList;
