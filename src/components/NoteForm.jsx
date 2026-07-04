import { useState, useRef } from "react";

function NoteForm({
  addNote,
  initialTitle = "",
  initialText = "",
  initialCategory = "Personal",
  buttonText = "Add Note",
}) {
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [category, setCategory] = useState(initialCategory);

  const textareaRef = useRef(null);

  function resizeTextarea() {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    addNote(title, text, category);

    // Only clear the form when creating a new note
    if (buttonText === "Add Note") {
      setTitle("");
      setText("");
      setCategory("Personal");

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Note title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        ref={textareaRef}
        placeholder="Write a note..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          resizeTextarea();
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="School">School</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default NoteForm;