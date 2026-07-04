function NoteCard({ note, deleteNote, openModal }) {
  const formattedDate = new Date(note.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className={`note-card ${note.category}`}
      onClick={() => openModal(note)}
    >
      {note.title && <h3>{note.title}</h3>}

      <p>{note.text}</p>

      <small>Created: {formattedDate}</small>

      {note.updatedAt && (
        <small>
          Updated:{" "}
          {new Date(note.updatedAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </small>
      )}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          deleteNote(note.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteCard;
