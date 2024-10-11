import { AiOutlineDelete } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { Note } from "../../../types";
import { textEllipsis } from "../../../utils/Helpers";
import { useUpdateNote } from "../hooks/useUpdateNote";

export const NoteCard: React.FC<{
  note: Note;
  onDelete: (id: number) => void;
}> = ({ note, onDelete }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { updateNote } = useUpdateNote();

  return (
    <div>
      <div className="note-card flex">
        <NavLink
          to={`/projects/${projectId}/note/${note.id}`}
          className="flex-1"
        >
          <h3>{textEllipsis(note.title, 22)}</h3>

          <p>
            {note.content
              ? textEllipsis(
                  note.content.replace(/[^a-zA-Z\s.,!?;:()'"-]/g, ""),
                  190
                )
              : ""}
          </p>
        </NavLink>

        <div className="icons flex gap-2 mt-1">
          <div className="border-debug" onClick={() => onDelete(note.id)}>
            <AiOutlineDelete />
          </div>
          <div onClick={() => updateNote({ ...note, isFav: !note.isFav })}>
            {note.isFav ? <FaStar /> : <FaRegStar />}
          </div>
        </div>
      </div>
    </div>
  );
};
