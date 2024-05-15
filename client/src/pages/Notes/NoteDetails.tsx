import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsCodeSlash, BsDot } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { Loader } from "../../components/Loader";
import { ApiClientContext } from "../../provider/apiClientProvider";

import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { queryClient } from "../..";
import { PageHeader } from "../../components/PageHeader";
import { ConfirmDialogContext } from "../../provider/confirmDialogProvider";
import { useToasts } from "../../provider/toastProvider";
import { EditNoteApi } from "../../types";
import { getIntervalStringFromDate, transformDate } from "../../utils/Date";

const myTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#191a23",
    caret: "white",
    fontFamily: "Segoe UI",
  },
  styles: [],
});

const NoteDetails: React.FC = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { noteId, projectId } = useParams<{
    noteId: string;
    projectId: string;
  }>();
  const { push } = useHistory();
  const { pushToast } = useToasts();
  const { confirm } = useContext(ConfirmDialogContext);

  const [readingView, setReadingView] = useState(true);
  const [note, setNote] = useState<any>(undefined);
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { data, isLoading } = useQuery(["notes", noteId], () =>
    apiClient.getNote(noteId)
  );

  const handleNoteUpdaing = (key: string, value: string) => {
    const updatedNote = { ...note, [key]: value, id: data.id };

    setNote(updatedNote);
  };

  const { mutate: updateNote, isLoading: isUpdating } = useMutation(
    (data: EditNoteApi) => apiClient.editNote(data),
    {
      onSuccess: (editedNote) => {
        setNote(editedNote);
        queryClient.invalidateQueries(["notes", noteId]);
      },
    }
  );

  const { mutate: deleteNote } = useMutation(
    (id: number) => apiClient.deleteNote(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notes", projectId]);
        pushToast({
          title: "Note deleted",
          message: "",
        });
        push(`/project/${projectId}`);
      },
    }
  );

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

  useEffect(() => {
    if (!data) return;
    setNote(data);
  }, [data]);

  useEffect(() => {
    function handleClickOutsideEditor(event: MouseEvent) {
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node) &&
        readingView === false
      ) {
        updateNote(note);
        setReadingView(true);
      }
    }

    function handleClickOutsideInput(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        data.title !== note?.title
      ) {
        updateNote(note);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideEditor);
    document.addEventListener("mousedown", handleClickOutsideInput);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEditor);
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, [editorRef, inputRef, data, note, readingView, updateNote]);

  return (
    <div className="flex page-content flex-2">
      <div className="note flex flex-column" style={{ zIndex: "5" }}>
        <PageHeader note={data}>
          <Dropdown
            left="-100px"
            width="100px"
            trigger={(toggle) => (
              <IconButton handler={toggle}>
                <BiDotsHorizontalRounded />
              </IconButton>
            )}
          >
            <DropdownItem handler={() => setReadingView((prev) => !prev)}>
              <BsCodeSlash /> Edit
            </DropdownItem>

            <DropdownItem handler={() => onDelete(note.id)}>
              <AiOutlineDelete /> Delete
            </DropdownItem>
          </Dropdown>
        </PageHeader>

        {isLoading && (
          <div className="flex justify-content-center mt-2">
            <Loader />
          </div>
        )}

        {!isLoading && note && data && (
          <>
            <div className="note-header">
              <textarea
                ref={inputRef}
                defaultValue={data.title}
                onChange={({ target }) =>
                  handleNoteUpdaing("title", target.value)
                }
              ></textarea>
              <div className="br"></div>
              <div className="flex mt-1 align-items-center">
                <span>
                  Created on
                  <span className="markee">
                    {transformDate(note.createdAt)}
                  </span>
                  <BsDot />
                </span>
                <span>
                  Last Edited
                  <span className="markee">
                    {isUpdating && <Loader width="12px" height="12px" />}

                    {!isUpdating && getIntervalStringFromDate(note.updatedAt)}
                  </span>
                  <BsDot />
                </span>
                <span>
                  Project :
                  <span className="markee bold">
                    {" "}
                    {note.project && note.project.name}
                  </span>
                </span>
              </div>
            </div>
            <div className="note-body flex flex-1" ref={editorRef}>
              {readingView && (
                <div
                  onDoubleClick={() => setReadingView(false)}
                  style={{ width: "100%" }}
                >
                  <MarkdownPreview
                    style={{
                      width: "100%",
                      background: "transparent",
                      marginBottom: "100px",
                    }}
                    source={note.content}
                  />
                </div>
              )}

              {!readingView && (
                <CodeMirror
                  minHeight="100%"
                  minWidth="100%"
                  maxWidth="100%"
                  style={{ overflow: "hidden", whiteSpace: "pre-wrap" }}
                  value={note.content || ""}
                  theme={myTheme}
                  className="codemirror-editor"
                  autoFocus
                  extensions={[
                    markdown({
                      base: markdownLanguage,
                      codeLanguages: languages,
                    }),
                  ]}
                  onChange={(value, viewUpdate) => {
                    handleNoteUpdaing("content", value);
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
