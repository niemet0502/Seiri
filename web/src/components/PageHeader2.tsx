import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ApiClientContext } from "../provider/apiClientProvider";

export const PageHeader2: React.FC<{}> = ({}) => {
  const { apiClient } = useContext(ApiClientContext);
  const { projectId, taskId, noteId } = useParams<{
    projectId: string;
    noteId: string;
    taskId: string;
  }>();

  const { data, refetch } = useQuery(["projects", projectId], () =>
    apiClient.getProject(projectId)
  );

  // const { path } = useLocation()

  useEffect(() => {
    if (!projectId) return;
    // console.log(data);
    console.log(projectId);

    refetch();
  }, [projectId]);

  return (
    <div>
      {data && (
        <div>
          <h4>{data.title}</h4>
        </div>
      )}
    </div>
  );
};
