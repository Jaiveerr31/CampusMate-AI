
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchNotes");
    const noteCards = document.querySelectorAll(".note-card");
    const totalNotes = document.getElementById("totalNotes");
    const favoriteNotes = document.getElementById("favoriteNotes");
    const recentNotes = document.getElementById("recentNotes");

    let currentSubject = "";

    // Create notes workspace
    const workspace = document.createElement("div");
    workspace.id = "notesWorkspace";
    workspace.style.cssText = `
        display:none;
        background:white;
        padding:25px;
        margin-top:25px;
        border-radius:15px;
        box-shadow:0 5px 20px rgba(0,0,0,0.1);
    `;

    workspace.innerHTML = `
        <h2 id="workspaceTitle"></h2>

        <p>Write and save your notes for this subject.</p>

        <textarea id="noteEditor"
            placeholder="Start writing your notes..."
            style="width:100%;min-height:250px;padding:15px;
            border:1px solid #ddd;border-radius:10px;
            font-family:inherit;box-sizing:border-box;">
        </textarea>

        <div style="margin-top:15px;display:flex;gap:10px;flex-wrap:wrap;">
            <button id="saveNoteBtn" type="button"
                style="padding:12px 20px;background:#2563eb;
                color:white;border:none;border-radius:8px;cursor:pointer;">
                Save Notes
            </button>

            <button id="closeNoteBtn" type="button"
                style="padding:12px 20px;background:#64748b;
                color:white;border:none;border-radius:8px;cursor:pointer;">
                Close
            </button>
        </div>

        <p id="saveStatus" aria-live="polite"></p>
    `;

    document.querySelector(".container").appendChild(workspace);

    const editor = document.getElementById("noteEditor");
    const workspaceTitle = document.getElementById("workspaceTitle");
    const saveStatus = document.getElementById("saveStatus");

    function storageKey(subject) {
        return "campusmate_notes_" + subject;
    }

    // Open subject notes
    noteCards.forEach(function (card) {
        const button = card.querySelector("button");
        const subject = card.querySelector("h2").textContent.trim();

        button.addEventListener("click", function () {
            currentSubject = subject;
            workspaceTitle.textContent = "📚 " + subject;

            editor.value = localStorage.getItem(storageKey(subject)) || "";
            saveStatus.textContent = "";

            workspace.style.display = "block";
            workspace.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Save notes
    document.getElementById("saveNoteBtn").addEventListener("click", function () {
        if (!currentSubject) return;

        try {
            localStorage.setItem(storageKey(currentSubject), editor.value);
            saveStatus.textContent = "✅ Notes saved successfully!";
            updateStats();
        } catch (error) {
            saveStatus.textContent = "Could not save notes. Check browser storage.";
        }
    });

    // Close workspace
    document.getElementById("closeNoteBtn").addEventListener("click", function () {
        workspace.style.display = "none";
    });

    // Search subjects
    searchInput.addEventListener("input", function () {
        const value = searchInput.value.toLowerCase();

        noteCards.forEach(function (card) {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(value) ? "" : "none";
        });
    });

    // Update statistics
    function updateStats() {
        let savedCount = 0;

        noteCards.forEach(function (card) {
            const subject = card.querySelector("h2").textContent.trim();
            const savedNote = localStorage.getItem(storageKey(subject));

            if (savedNote && savedNote.trim() !== "") {
                savedCount++;
            }
        });

        totalNotes.textContent = savedCount;
        favoriteNotes.textContent = "0";
        recentNotes.textContent = savedCount;
    }

    updateStats();

    console.log("CampusMate AI Notes Loaded!");
});


/* ==========================================
   CAMPUSMATE AI - PDF FILE MANAGEMENT
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const DB_NAME = "CampusMatePDFDatabase";
    const STORE_NAME = "pdfFiles";

    let database = null;
    let activeSubject = "";

    const workspace = document.getElementById("notesWorkspace");

    if (!workspace) {
        console.error("Notes workspace not found.");
        return;
    }

    // Create PDF management section
    const pdfSection = document.createElement("section");

    pdfSection.style.cssText = `
        margin-top:25px;
        padding:20px;
        border:1px solid #e2e8f0;
        border-radius:12px;
        background:#f8fafc;
    `;

    pdfSection.innerHTML = `
        <h3>📄 Subject PDF Files</h3>

        <p>Upload and manage PDF notes for this subject.</p>

        <input
            type="file"
            id="pdfUploadInput"
            accept=".pdf,application/pdf"
            style="margin:12px 0;max-width:100%;"
        >

        <button type="button" id="uploadPdfBtn"
            style="padding:10px 18px;background:#2563eb;
            color:white;border:none;border-radius:8px;
            cursor:pointer;">
            Upload PDF
        </button>

        <p id="pdfMessage" role="status"></p>

        <div id="pdfFileList"></div>
    `;

    workspace.appendChild(pdfSection);

    const pdfInput = document.getElementById("pdfUploadInput");
    const uploadButton = document.getElementById("uploadPdfBtn");
    const pdfMessage = document.getElementById("pdfMessage");
    const pdfFileList = document.getElementById("pdfFileList");

    function showMessage(message) {
        pdfMessage.textContent = message;
    }

    // Open IndexedDB
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(
                STORE_NAME,
                { keyPath: "id", autoIncrement: true }
            );

            store.createIndex("subject", "subject", {
                unique: false
            });
        }
    };

    request.onsuccess = function (event) {
        database = event.target.result;
        showMessage("PDF storage ready.");

        if (activeSubject) {
            loadPDFs();
        }
    };

    request.onerror = function () {
        showMessage("Unable to open PDF storage.");
    };

    // Detect which subject is open
    document.querySelectorAll(".note-card").forEach(function (card) {

        const button = card.querySelector("button");
        const subject = card.querySelector("h2").textContent.trim();

        button.addEventListener("click", function () {
            activeSubject = subject;
            pdfInput.value = "";
            showMessage("");
            loadPDFs();
        });
    });

    // Upload PDF
    uploadButton.addEventListener("click", function () {

        const file = pdfInput.files[0];

        if (!activeSubject) {
            showMessage("Please open a subject first.");
            return;
        }

        if (!file) {
            showMessage("Please select a PDF file.");
            return;
        }

        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {
            showMessage("Only PDF files are supported.");
            return;
        }

        if (!database) {
            showMessage("PDF storage is not ready.");
            return;
        }

        const record = {
            subject: activeSubject,
            name: file.name,
            file: file,
            uploadedAt: new Date().toISOString()
        };

        const transaction = database.transaction(
            STORE_NAME, "readwrite"
        );

        transaction.objectStore(STORE_NAME).add(record);

        transaction.oncomplete = function () {
            showMessage("PDF uploaded successfully!");
            pdfInput.value = "";
            loadPDFs();
        };

        transaction.onerror = function () {
            showMessage("Upload failed. Browser storage may be full.");
        };
    });

    // Display subject PDFs
    function loadPDFs() {

        pdfFileList.replaceChildren();

        if (!database || !activeSubject) return;

        const subject = activeSubject;

        const transaction = database.transaction(
            STORE_NAME, "readonly"
        );

        const index = transaction.objectStore(
            STORE_NAME
        ).index("subject");

        const request = index.getAll(subject);

        request.onsuccess = function () {

            if (subject !== activeSubject) return;

            const files = request.result;

            pdfFileList.replaceChildren();

            if (files.length === 0) {
                const empty = document.createElement("p");
                empty.textContent = "No PDFs uploaded yet.";
                pdfFileList.appendChild(empty);
                return;
            }

            files.forEach(function (record) {

                const row = document.createElement("div");

                row.style.cssText = `
                    padding:12px;
                    margin-top:10px;
                    background:white;
                    border-radius:8px;
                    display:flex;
                    flex-wrap:wrap;
                    align-items:center;
                    gap:10px;
                `;

                const name = document.createElement("span");
                name.textContent = "📄 " + record.name;
                name.style.flex = "1";

                const viewBtn = document.createElement("button");
                viewBtn.textContent = "View";

                const downloadBtn = document.createElement("button");
                downloadBtn.textContent = "Download";

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";

                [viewBtn, downloadBtn, deleteBtn].forEach(function (btn) {
                    btn.type = "button";
                    btn.style.cssText = `
                        padding:8px 12px;
                        border:0;
                        border-radius:6px;
                        background:#2563eb;
                        color:white;
                        cursor:pointer;
                    `;
                });

                deleteBtn.style.background = "#dc2626";

                // View PDF
                viewBtn.addEventListener("click", function () {
                    const url = URL.createObjectURL(record.file);
                    const newTab = window.open("", "_blank");

                    if (!newTab) {
                        URL.revokeObjectURL(url);
                        showMessage("Allow pop-ups to view this PDF.");
                        return;
                    }

                    newTab.location.href = url;

                    // Keep the URL alive while the new tab loads.
                    // Revoke it later to avoid accumulating object URLs.
                    setTimeout(function () {
                        URL.revokeObjectURL(url);
                    }, 60000);
                });

                // Download PDF
                downloadBtn.addEventListener("click", function () {
                    const url = URL.createObjectURL(record.file);
                    const link = document.createElement("a");

                    link.href = url;
                    link.download = record.name;

                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    setTimeout(function () {
                        URL.revokeObjectURL(url);
                    }, 10000);
                });

                // Delete PDF
                deleteBtn.addEventListener("click", function () {

                    if (!confirm("Delete " + record.name + "?")) {
                        return;
                    }

                    const transaction = database.transaction(
                        STORE_NAME, "readwrite"
                    );

                    transaction.objectStore(STORE_NAME).delete(record.id);

                    transaction.oncomplete = function () {
                        showMessage("PDF deleted successfully!");
                        loadPDFs();
                    };

                    transaction.onerror = function () {
                        showMessage("Unable to delete PDF.");
                    };
                });

                row.append(
                    name,
                    viewBtn,
                    downloadBtn,
                    deleteBtn
                );

                pdfFileList.appendChild(row);
            });
        };

        request.onerror = function () {
            showMessage("Unable to load PDFs.");
        };
    }

});
