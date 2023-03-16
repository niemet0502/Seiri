import { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTaskX } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { NoteCard } from "../../components/NoteCard";
import { PageHeader } from "../../components/PageHeader";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { useToasts } from "../../provider/toastProvider";
import { CreateNoteApi, Note } from "../../types";

export const NotesList: React.FC = () => {
  const { pushToast } = useToasts();
  const { projectId } = useParams<{ projectId: string }>();
  const { push } = useHistory();
  const { apiClient } = useContext(ApiClientContext);

  const { data, isLoading } = useQuery(["notes", projectId], () =>
    apiClient.getNotesByProject(projectId)
  );

  const notes = data || [];

  const { mutate: createNote } = useMutation(
    (data: CreateNoteApi) => apiClient.createNote(data),
    {
      onSuccess: (newNote) => {
        pushToast({
          title: "Note created",
          message: newNote.title,
        });

        push(`/project/${projectId}/note/${newNote.id}`);
      },
    }
  );

  return (
    <div className="flex page-content flex-2">
      <div className="flex flex-column w-100">
        <div className="notes-list-header">
          <PageHeader>
            <h4>2023 Roadmap</h4>

            <div className="flex">
              <IconButton
                handler={() => createNote({ projectId, title: "Untitled" })}
              >
                <AiOutlinePlus />
              </IconButton>
              <Dropdown
                left="-120px"
                trigger={(toggle) => (
                  <IconButton handler={toggle}>
                    <BiDotsHorizontalRounded />
                  </IconButton>
                )}
              >
                <DropdownItem>
                  <AiOutlineEdit /> Edit
                </DropdownItem>

                <DropdownItem>
                  <AiOutlineDelete /> Delete
                </DropdownItem>

                <DropdownItem>
                  <BsArchive /> Archive
                </DropdownItem>
              </Dropdown>
            </div>
          </PageHeader>
        </div>
        <div className="flex notes-list">
          {notes.length > 0 &&
            notes.map((note: Note) => <NoteCard key={note.id} note={note} />)}
        </div>

        {notes.length === 0 && !isLoading && (
          <div
            className="flex flex-column align-items-center justify-content-center gap-2 align-self-center"
            style={{ marginTop: "180px" }}
          >
            <BiTaskX size={55} />
            <h3>No Note found </h3>
            <p>Organize your life. Achieve more every day by creating a note</p>
            <Button>
              <AiOutlinePlus /> Create Note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
