import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTaskX } from "react-icons/bi";
import { useHistory, useParams } from "react-router-dom";
import { queryClient } from "../..";
import { Button, IconButton } from "../../components/Button";
import { NoteCard } from "../../components/NoteCard";
import { PageHeader } from "../../components/PageHeader";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { ConfirmDialogContext } from "../../provider/confirmDialogProvider";
import { useToasts } from "../../provider/toastProvider";
import { CreateNoteApi, Note } from "../../types";

export const NotesList: React.FC = () => {
  const { pushToast } = useToasts();
  const { projectId } = useParams<{ projectId: string }>();
  const { push } = useHistory();
  const { apiClient } = useContext(ApiClientContext);
  const { confirm } = useContext(ConfirmDialogContext);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", projectId],
    queryFn: () => apiClient.getNotesByProject(projectId),
  });

  const notes = data || [];

  const { mutate: createNote } = useMutation({
    mutationFn: (data: CreateNoteApi) => apiClient.createNote(data),

    onSuccess: (newNote) => {
      pushToast({
        title: "Note created",
        message: newNote.title,
      });

      push(`/project/${projectId}/note/${newNote.id}`);
    },
  });

  const { mutate: deleteNote } = useMutation({
    mutationFn: (id: number) => apiClient.deleteNote(id),

    onSuccess: () => {
      pushToast({
        title: "Note deleted",
        message: "",
      });
      queryClient.invalidateQueries({ queryKey: ["notes", projectId] });
    },
  });

  const onDelete = async (noteId: number) => {
    if (
      await confirm({
        title: "Delete Note ?",
        message: "Are you sure you want to delete this note ?",
      })
    ) {
      deleteNote(noteId);
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
