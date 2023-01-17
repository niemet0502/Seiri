import { NoteCard } from "../../components/NoteCard";

export const NotesList: React.FC = () => {
  // get the project id from the url and fetch its notes

  const notes = [
    {
      id: 1,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 2,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 3,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 4,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 5,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 6,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 7,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
    {
      id: 8,
      content:
        "loremhnsankdasbdbsadk sbdasbduiqsd sabdkjasbd9q asbdbasiudbwqdqwdhwq8 bdqwbdqwd wbd9wqbd",
    },
  ];
  return (
    <div className="flex notes-list border-debug">
      {notes.map((note) => (
        <NoteCard key={note.id} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} />
      ))}
    </div>
  );
};
