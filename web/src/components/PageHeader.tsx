import { useContext, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import { ApiClientContext } from "../provider/apiClientProvider";
import { Note, Task } from "../types";
import { textEllipsis } from "../utils/Helpers";

export const PageHeader: React.FC<{
  title?: string;
  children?: React.ReactNode;
  task?: Task;
  note?: Note;
}> = ({ children, task, note, title }) => {
  const { apiClient } = useContext(ApiClientContext);
  const { projectId } = useParams<{
    projectId: string;
    noteId: string;
    taskId: string;
  }>();

  const { data, refetch } = useQuery(
    ["projects", projectId],
    () => apiClient.getProject(projectId),
    {
      enabled: projectId ? true : false,
    }
  );

  useEffect(() => {
    if (!projectId) return;
    refetch();
  }, [projectId, refetch]);

  return (
    <div className="flex page-header">
      {data && (
        <div>
          <h4 className="flex align-items-center gap-1">
            {title && <span>{title}</span>}
            {!title && (
              <NavLink to={`/project/${data.id}`}>{data.name}</NavLink>
            )}

            {note && (
              <span className="flex align-items-center gap-1">
                <IoIosArrowForward style={{ marginBottom: "-2.5px" }} />
                {textEllipsis(note.title, 200)}
              </span>
            )}

            {task && (
              <span className="flex align-items-center gap-1">
                <IoIosArrowForward style={{ marginBottom: "-2.5px" }} />
                {textEllipsis(task.title, 200)}
              </span>
            )}
          </h4>
        </div>
      )}

      {children}
    </div>
  );
};
