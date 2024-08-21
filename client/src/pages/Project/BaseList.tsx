import { useContext } from "react";
import { NotesList } from "../../domains/notes/pages/NotesList";
import { currentFeatureContext } from "../../provider/currentFeatureProvider";
import { FeatureEnum } from "../../types";
import { TasksList } from "../Tasks/TasksList";

const BaseList: React.FC = () => {
  const { feature } = useContext(currentFeatureContext);

  return feature === FeatureEnum.Note ? <NotesList /> : <TasksList />;
};

export default BaseList;
