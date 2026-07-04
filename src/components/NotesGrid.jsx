import NoteCard from "./NoteCard";

function NotesGrid({ notes, deleteNote, openModal }) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          openModal={openModal}
        />
      ))}
    </div>
  );
}

export default NotesGrid;