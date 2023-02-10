import { useContext } from "react";
import { currentFeatureContext } from "../../provider/currentFeatureProvider";
import { FeatureEnum } from "../../types";
import { NotesList } from "../Notes/NotesList";
import { TasksList } from "../Tasks/TasksList";

export const BaseList: React.FC = () => {
  const { feature } = useContext(currentFeatureContext);
  return feature === FeatureEnum.Note ? <NotesList /> : <TasksList />;
};
