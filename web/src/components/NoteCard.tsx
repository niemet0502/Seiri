import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import { Note } from "../types";

// will receive a note as arguments
export const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
  const { projectId } = useParams<{ projectId: string }>();
  return (
    <NavLink to={`/project/${projectId}/note/${note.id}`}>
      <div className="note-card flex">
        <div>
          <h3>{note.title}</h3>

          <p>{note.content}</p>
        </div>

        <div className="icons flex gap-2">
          <div className="border-debug">
            <AiOutlineDelete />
          </div>

          <div className="border-debug">
            <BsArchive />
          </div>

          <div className="border-debug">
            <AiOutlineStar />
          </div>
        </div>
      </div>
    </NavLink>
  );
};
