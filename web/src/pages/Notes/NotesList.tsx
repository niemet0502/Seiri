import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTaskX } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { NoteCard } from "../../components/NoteCard";
import { PageHeader } from "../../components/PageHeader";
import { notes } from "../../utils/data";

export const NotesList: React.FC = () => {
  // get the project id from the url and fetch its notes

  return (
    <div className="flex page-content flex-2">
      <div className="flex flex-column w-100">
        <div className="notes-list-header">
          <PageHeader>
            <h4>2023 Roadmap</h4>

            <div className="flex">
              <IconButton>
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
        {notes.length === 0 && (
          <div className="flex notes-list">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}

        {notes && (
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
