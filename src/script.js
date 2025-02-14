class NotesApp {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    this.addBtn = document.querySelector(".add-btn");
    this.clearAll = document.querySelector(".clear-all");
    this.searchBox = document.querySelector(".search-box");
    this.notesContainer = document.querySelector(".notes-container");

    this.addBtn.addEventListener("click", () => this.addNote());
    this.clearAll.addEventListener("click", () => this.clearAllNotes());
    this.searchBox.addEventListener("input", () => this.searchNotes());

    this.displayNotes();
  }

  addNote() {
    const note = {
      id: Date.now(),
      title: "",
      content: "",
      lastModified: new Date().toLocaleString(),
    };

    this.notes.push(note);
    this.saveNotes();
    this.displayNotes();
  }

  createNoteElement(note) {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
            <div class="note-top">
                <img src="assets/favicon.png" alt="note">
                <p>${note.lastModified}</p>
            </div>
            <div class="note-header">
                <input type="text" class="note-title" placeholder="Note Title" value="${note.title}">  
                </div>
                <hr/>              
            <textarea class="note-content" placeholder="Write your note here...">${note.content}</textarea>
            <div class="note-buttons">
                <button class="save-btn">Save</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    const titleInput = noteElement.querySelector(".note-title");
    const contentTextarea = noteElement.querySelector(".note-content");
    const saveBtn = noteElement.querySelector(".save-btn");
    const deleteBtn = noteElement.querySelector(".delete-btn");

    titleInput.addEventListener("input", () => {
      note.title = titleInput.value;
      note.lastModified = new Date().toLocaleString();
      this.saveNotes();
    });

    contentTextarea.addEventListener("input", () => {
      note.content = contentTextarea.value;
      note.lastModified = new Date().toLocaleString();
      this.saveNotes();
    });

    saveBtn.addEventListener("click", () => {
      this.saveNotes();
      alert("Note saved!");
    });

    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this note?")) {
        this.notes = this.notes.filter((n) => n.id !== note.id);
        this.saveNotes();
        this.displayNotes();
      }
    });

    return noteElement;
  }

  displayNotes() {
    this.notesContainer.innerHTML = "";
    const searchTerm = this.searchBox.value.toLowerCase();

    const filteredNotes = this.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
    );

    filteredNotes.forEach((note) => {
      const noteElement = this.createNoteElement(note);
      this.notesContainer.appendChild(noteElement);
    });
  }

  searchNotes() {
    this.displayNotes();
  }

  saveNotes() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
  clearAllNotes() {
    if (confirm("Are you sure you want to clear all notes?")) {
      this.notes = [];
      localStorage.removeItem("notes");
      this.displayNotes();
    }
  }
}

// Initialize the app
const notesApp = new NotesApp();
