import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { Features } from "../../container/Features";
import { TaskDetails } from "../Tasks/TaskDetails";

export const Content: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "2023 Roadmap",
      notes: 24,
      color: "yellow",
    },
    {
      id: 2,
      title: "2022",
      notes: 1,
      color: "teal",
    },
    {
      id: 3,
      title: "Bills",
      notes: 120,
      color: "green",
    },
    {
      id: 4,
      title: "Groceries",
      notes: 5,
      color: "grape",
    },
    {
      id: 5,
      title: "Work",
      notes: 75,
      color: "blue",
    },
  ];

  return (
    <div className="content-wrapper flex">
      <Features />
      <div className="project-sidebar">
        <div className="flex header">
          Projects
          <AiOutlinePlus />
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-items flex">
              <div className="flex align-items-center project-title">
                <RxDotFilled style={{ color: project.color }} />
                <span style={{ fontSize: "14px" }}>{project.title}</span>
              </div>
              <div className="flex align-items-center">
                <span className="notes-count">{project.notes}</span>
                <BiDotsHorizontalRounded className="dot-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex page-content" style={{ flex: "2" }}>
        {/* <NotesList /> */}
        {/* <NoteDetails /> */}

        {/* <TasksList /> */}
        <TaskDetails />
      </div>
    </div>
  );
};
