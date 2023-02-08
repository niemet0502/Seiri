import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { NoteCard } from "../../components/NoteCard";
import { PageHeader } from "../../components/PageHeader";

export const NotesList: React.FC = () => {
  // get the project id from the url and fetch its notes

  const notes = [
    {
      id: 1,
      title: "First note",
      description: "description",
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 2,
      title: "First note",
      description: "description",
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 3,
      title: "First note",
      description: "description",
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 4,
      title: "First note",
      description: "description",
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 5,
      title: "First note",
      description: "description",
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 6,
      title: "First note",
      description: "description",
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 7,
      title: "First note",
      description: "description",
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
  ];
  return (
    <div className="flex flex-column">
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
      <div className="flex notes-list">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};
