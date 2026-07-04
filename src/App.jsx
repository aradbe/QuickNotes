import { useEffect, useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NotesGrid from "./components/NotesGrid";
import NoteModal from "./components/NoteModal";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      return JSON.parse(savedNotes);
    }

    return [];
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(title, text, category) {
    const newNote = {
      id: Date.now(),
      title,
      text,
      category,
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]);
  }

  function deleteNote(id) {
    const confirmed = confirm("Are you sure you want to delete your note?");

    if (!confirmed) return;

    setNotes(notes.filter((note) => note.id !== id));
  }

  function updateNote(id, title, text, category) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title,
          text,
          category,
          updatedAt: new Date(),
        };
      }

      return note;
    });

    setNotes(updatedNotes);
    closeModal();
  }

  function openModal(note) {
    setSelectedNote(note);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedNote(null);
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.text.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <h1>QuickNotes</h1>

      <NoteForm addNote={addNote} />

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="filters">
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Personal")}>
          Personal
        </button>
        <button onClick={() => setSelectedCategory("Work")}>Work</button>
        <button onClick={() => setSelectedCategory("School")}>School</button>
        <button onClick={() => setSelectedCategory("Other")}>Other</button>
      </div>

      <NotesGrid notes={filteredNotes} deleteNote={deleteNote} openModal={openModal} />

      <NoteModal
        note={selectedNote}
        isOpen={isModalOpen}
        closeModal={closeModal}
        updateNote={updateNote}
      />
    </div>
  );
}

export default App;
