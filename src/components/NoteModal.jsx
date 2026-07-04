import Modal from "react-modal";
import NoteForm from "./NoteForm";

Modal.setAppElement("#root");

function NoteModal({ note, isOpen, closeModal, updateNote }) {
  if (!note) return null;

  const createdDate = new Date(note.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const updatedDate = note.updatedAt
    ? new Date(note.updatedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Note"
      style={{
        content: {
          maxWidth: "600px",
          margin: "auto",
          height: "fit-content",
        },
      }}
    >
      <h2 className="note-modal-title">Edit Note</h2>

      <NoteForm
        addNote={(title, text, category) =>
          updateNote(note.id, title, text, category)
        }
        initialTitle={note.title}
        initialText={note.text}
        initialCategory={note.category}
        buttonText="Save Changes"
      />

      <hr />

      <div className="modal-dates">
        <p>
          <strong>Created:</strong> {createdDate}
        </p>

        {updatedDate && (
          <p>
            <strong>Updated:</strong> {updatedDate}
          </p>
        )}
      </div>

      <button className="modal-close-btn" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
}

export default NoteModal;
