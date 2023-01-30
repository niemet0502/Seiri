import { NoteCard } from "../../components/NoteCard";

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
    <div className="flex notes-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};
