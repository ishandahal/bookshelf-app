// Change this if your backend runs on a different host or port.
const API_BASE = "http://localhost:8000";

// --- Helper: thin wrapper around fetch() ---

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const headers = {};
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.detail || `Request failed (${response.status})`;
    throw new Error(message);
  }

  // 204 No Content has no body to parse
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// --- DOM references ---

const bookList = document.getElementById("book-list");
const addForm = document.getElementById("add-book-form");
const errorDisplay = document.getElementById("error-message");

// --- Error display ---

function showError(message) {
  errorDisplay.textContent = message;
  errorDisplay.hidden = false;
}

function clearError() {
  errorDisplay.textContent = "";
  errorDisplay.hidden = true;
}

// --- Render a single book card ---

function renderBook(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const badgeClass = book.status || "want-to-read";
  const statusLabel = book.status.replace(/-/g, " ");

  let detailsHtml = "";
  if (book.genre) {
    detailsHtml += `<p class="detail"><strong>Genre:</strong> ${book.genre}</p>`;
  }
  if (book.notes) {
    detailsHtml += `<p class="detail"><strong>Notes:</strong> ${book.notes}</p>`;
  }
  if (book.source) {
    detailsHtml += `<p class="detail"><strong>Source:</strong> ${book.source}</p>`;
  }

  const addedDate = new Date(book.added_at).toLocaleDateString();

  card.innerHTML = `
    <h3>${book.title} <span class="badge ${badgeClass}">${statusLabel}</span></h3>
    <p class="author">by ${book.author}</p>
    ${detailsHtml}
    <p class="detail"><strong>Added:</strong> ${addedDate}</p>
    <button class="delete-btn" data-id="${book.id}">Delete</button>
  `;

  bookList.appendChild(card);
}

// --- Load and display all books ---

async function loadBooks() {
  try {
    const books = await apiFetch("/books");
    bookList.innerHTML = "";

    if (books.length === 0) {
      bookList.innerHTML = '<p class="empty-state">No books yet. Add one above!</p>';
      return;
    }

    for (const book of books) {
      renderBook(book);
    }
    clearError();
  } catch (err) {
    showError(`Could not load books: ${err.message}`);
  }
}

// --- Add a book ---

async function addBook(event) {
  event.preventDefault();

  const formData = new FormData(addForm);
  const bookData = Object.fromEntries(formData);

  // Strip empty optional fields so the API gets clean data
  for (const [key, value] of Object.entries(bookData)) {
    if (value === "" && key !== "title" && key !== "author") {
      delete bookData[key];
    }
  }

  try {
    await apiFetch("/books", { method: "POST", body: bookData });
    addForm.reset();
    clearError();
    await loadBooks();
  } catch (err) {
    showError(`Could not add book: ${err.message}`);
  }
}

// --- Delete a book ---

async function deleteBook(bookId) {
  try {
    await apiFetch(`/books/${bookId}`, { method: "DELETE" });
    clearError();
    await loadBooks();
  } catch (err) {
    showError(`Could not delete book: ${err.message}`);
  }
}

// --- Event listeners ---

addForm.addEventListener("submit", addBook);

// Event delegation: handle delete clicks on any current or future delete button
bookList.addEventListener("click", (event) => {
  if (event.target.matches(".delete-btn")) {
    const id = event.target.dataset.id;
    deleteBook(id);
  }
});

// --- Initial load ---

loadBooks();
