const API_BASE_URL = "http://localhost:3000";

const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const notesList = document.getElementById("notesList");
const statusText = document.getElementById("statusText");

async function fetchNotes() {
  statusText.textContent = "Loading notes...";
  notesList.innerHTML = "";

  try {
    const response = await fetch(`${API_BASE_URL}/api/notes`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const notes = await response.json();
    renderNotes(notes);
    statusText.textContent = "";
  } catch (error) {
    statusText.textContent = "Failed to load notes.";
    console.error(error);
  }
}

function renderNotes(notes) {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML = `<p class="empty">No notes yet.</p>`;
    return;
  }

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h3>${escapeHtml(note.title)}</h3>
      <p>${escapeHtml(note.content)}</p>
      <small>Created: ${new Date(note.created_at).toLocaleString()}</small>
      <button data-id="${note.id}">Delete</button>
    `;

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", async () => {
      await deleteNote(note.id);
    });

    notesList.appendChild(div);
  });
}

noteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    titleInput.value = "";
    contentInput.value = "";
    fetchNotes();
  } catch (error) {
    console.error(error);
    alert("Failed to add note.");
  }
});

async function deleteNote(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    fetchNotes();
  } catch (error) {
    console.error(error);
    alert("Failed to delete note.");
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

fetchNotes();