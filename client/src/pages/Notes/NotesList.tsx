import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTaskX } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Button, IconButton } from "../../components/Button";
import { NoteCard } from "../../components/NoteCard";
import { PageHeader } from "../../components/PageHeader";
import { useCreateNote } from "../../domains/notes/hooks/useCreateNote";
import { useNotes } from "../../domains/notes/hooks/useNotes";
import { useRemoveNote } from "../../domains/notes/hooks/useRemoveNote";
import { ConfirmDialogContext } from "../../provider/confirmDialogProvider";
import { Note } from "../../types";

export const NotesList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { confirm } = useContext(ConfirmDialogContext);

  const { data, isLoading } = useNotes(+projectId);

  const notes = data || [];

  const { createNote } = useCreateNote(+projectId);
  const { removeNote } = useRemoveNote();

  const onDelete = async (noteId: number) => {
    if (
      await confirm({
        title: "Delete Note ?",
        message: "Are you sure you want to delete this note ?",
      })
    ) {
      removeNote(noteId);
    }
  };

  return (
    <div className="flex page-content flex-2">
      <div
        className="flex flex-column "
        style={{ width: "calc(100% - 120px)", maxWidth: "950px" }}
      >
        <div className="notes-list-header">
          <PageHeader>
            <div className="flex">
              <IconButton
                handler={() => createNote({ projectId, title: "Untitled" })}
              >
                <AiOutlinePlus />
              </IconButton>
            </div>
          </PageHeader>
        </div>
        <div className="flex notes-list">
          {notes.length > 0 &&
            notes.map((note: Note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={(noteId: number) => onDelete(noteId)}
              />
            ))}
        </div>

        {notes.length === 0 && !isLoading && (
          <div
            className="flex flex-column align-items-center justify-content-center gap-2 align-self-center"
            style={{ marginTop: "180px" }}
          >
            <BiTaskX size={55} />
            <h3>No Note found </h3>
            <p>Organize your life. Achieve more every day by creating a note</p>
            <Button
              handler={() => createNote({ projectId, title: "Untitled" })}
            >
              <AiOutlinePlus /> Create Note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
