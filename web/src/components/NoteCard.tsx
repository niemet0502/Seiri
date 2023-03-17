import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import { Note } from "../types";
import { textEllipsis } from "../utils/Helpers";
// will receive a note as arguments
export const NoteCard: React.FC<{
  note: Note;
  onDelete: (id: number) => void;
}> = ({ note, onDelete }) => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div>
      <div className="note-card flex">
        <NavLink
          to={`/project/${projectId}/note/${note.id}`}
          className="flex-1"
        >
          <h3>{textEllipsis(note.title, 33)}</h3>

          <p>
            {note.content
              ? textEllipsis(
                  note.content.replace(/[^a-zA-Z\s.,!?;:()'"-]/g, ""),
                  200
                )
              : ""}
          </p>
        </NavLink>

        <div className="icons flex gap-2">
          <div className="border-debug" onClick={() => onDelete(note.id)}>
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
    </div>
  );
};
