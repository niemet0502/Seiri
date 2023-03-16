import { useMemo } from "react";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import { Note } from "../types";
// will receive a note as arguments
export const NoteCard: React.FC<{
  note: Note;
  onDelete: (id: number) => void;
}> = ({ note, onDelete }) => {
  const { projectId } = useParams<{ projectId: string }>();

  const contentPreview = useMemo(() => {
    if (!note.content) return "";

    let text = note.content.replace(/[^a-zA-Z\s.,!?;:()'"-]/g, "");

    // Add an ellipsis if the resulting string is longer than 100 characters
    if (text.length > 200) {
      text = text.slice(0, 200) + "...";
    }

    return text;
  }, [note]);

  return (
    <div>
      <div className="note-card flex">
        <NavLink
          to={`/project/${projectId}/note/${note.id}`}
          className="flex-1"
        >
          <h3>{note.title}</h3>

          <p>{contentPreview}</p>
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
