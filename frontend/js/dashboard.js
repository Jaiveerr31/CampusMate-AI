
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // CAMPUSMATE AI — DASHBOARD
    // ==========================================

    const DEMO_STATS = {
        assignments: 4,
        cgpa: 7.22,
        classes: 4,
        streak: 18
    };

    // ==========================================
    // 1. DASHBOARD STATISTICS
    // ==========================================

    function setStat(id, value) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }

    function loadAttendance() {
        try {
            const saved = localStorage.getItem(
                "campusmate_attendance_v1"
            );

            if (!saved) {
                setStat("attendanceValue", "Demo");
                return;
            }

            const subjects = JSON.parse(saved);

            if (!Array.isArray(subjects)) {
                setStat("attendanceValue", "Demo");
                return;
            }

            let attended = 0;
            let total = 0;

            subjects.forEach(function (subject) {
                attended += Number(subject.attended) || 0;
                total += Number(subject.total) || 0;
            });

            const percentage = total > 0
                ? Math.round((attended / total) * 100)
                : 0;

            setStat("attendanceValue", percentage + "%");

            const progress = document.querySelector(
                ".attendance-card .progress-fill"
            );

            if (progress) {
                progress.style.width = percentage + "%";
            }

        } catch (error) {
            setStat("attendanceValue", "Demo");
        }
    }

    function loadNotes() {
        try {
            const subjects = [
                "Java Programming",
                "Database Management",
                "Artificial Intelligence",
                "Computer Networks",
                "Operating System",
                "Python"
            ];

            let count = 0;

            subjects.forEach(function (subject) {
                const saved = localStorage.getItem(
                    "campusmate_notes_" + subject
                );

                if (saved && saved.trim() !== "") {
                    count++;
                }
            });

            setStat("notesValue", count);

            const label = document.querySelector(
                ".notes-card small"
            );

            if (label) {
                label.textContent = "Subjects With Saved Notes";
            }

        } catch (error) {
            setStat("notesValue", "Demo");
        }
    }

    function loadOtherStats() {
        setStat("assignmentValue", DEMO_STATS.assignments);
        setStat("cgpaValue", DEMO_STATS.cgpa.toFixed(2));
        setStat("classesValue", DEMO_STATS.classes);
        setStat("streakValue", DEMO_STATS.streak);

        const labels = [
            [".assignment-card small", "Demo Pending Tasks"],
            [".cgpa-card small", "Demo Semester Average"],
            [".classes-card small", "Demo Classes"],
            [".streak-card small", "Demo Study Streak"]
        ];

        labels.forEach(function (item) {
            const label = document.querySelector(item[0]);

            if (label) {
                label.textContent = item[1];
            }
        });
    }

    loadAttendance();
    loadNotes();
    loadOtherStats();

    // ==========================================
    // 2. QUICK ACTIONS
    // ==========================================

    function navigate(buttonId, destination) {
        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener("click", function () {
                window.location.href = destination;
            });
        }
    }

    navigate("addNoteBtn", "notes.html");
    navigate("uploadBtn", "notes.html");
    navigate("cgpaBtn", "cgpa.html");
    navigate("aiBtn", "ai.html");

    // ==========================================
    // 3. DASHBOARD SEARCH
    // ==========================================

    const search = document.getElementById("dashboardSearch");

    const searchRoutes = [
        {
            keywords: ["note", "pdf", "document"],
            page: "notes.html"
        },
        {
            keywords: ["attendance", "present", "absent"],
            page: "attendence.html"
        },
        {
            keywords: ["assignment", "deadline", "task"],
            page: "assignments.html"
        },
        {
            keywords: ["cgpa", "sgpa", "grade", "semester"],
            page: "cgpa.html"
        },
        {
            keywords: ["timetable", "schedule", "class"],
            page: "timetable.html"
        },
        {
            keywords: ["ai", "quiz", "viva", "study plan"],
            page: "ai.html"
        },
        {
            keywords: ["setting", "theme", "dark mode"],
            page: "settings.html"
        }
    ];

    if (search) {
        search.addEventListener("keydown", function (event) {
            if (event.key !== "Enter") return;

            const query = search.value.trim().toLowerCase();

            if (!query) return;

            const match = searchRoutes.find(function (route) {
                return route.keywords.some(function (keyword) {
                    return query.includes(keyword);
                });
            });

            if (match) {
                window.location.href = match.page;
            } else {
                alert(
                    "No matching section found.\n\n" +
                    "Try searching Notes, Attendance, " +
                    "Assignments, CGPA, Timetable or AI."
                );
            }
        });
    }

    // ==========================================
    // 4. NOTIFICATIONS
    // ==========================================

    const notificationBtn = document.getElementById(
        "notificationBtn"
    );

    if (notificationBtn) {
        notificationBtn.addEventListener("click", function () {
            alert(
                "🔔 CampusMate Notifications\n\n" +
                "📚 Review your saved notes.\n" +
                "📝 Check your assignment deadlines.\n" +
                "📈 Keep your attendance updated.\n\n" +
                "Live reminders are not connected yet."
            );
        });
    }

    // ==========================================
    // 5. DARK MODE
    // ==========================================

    const themeBtn = document.getElementById("themeBtn");

    // Inject dashboard-specific theme styles.
    const darkStyles = document.createElement("style");

    darkStyles.textContent = `
        body.dark-mode {
            background: #0f172a !important;
            color: #f8fafc !important;
        }

        body.dark-mode .main {
            background: #0f172a !important;
            color: #f8fafc !important;
        }

        body.dark-mode .topbar,
        body.dark-mode .card,
        body.dark-mode .schedule-card {
            background: #1e293b !important;
            color: #f8fafc !important;
        }

        body.dark-mode h1,
        body.dark-mode h2,
        body.dark-mode h4,
        body.dark-mode p,
        body.dark-mode strong {
            color: #f8fafc !important;
        }

        body.dark-mode small,
        body.dark-mode .subtitle {
            color: #cbd5e1 !important;
        }

        body.dark-mode .search-box {
            background: #334155 !important;
        }

        body.dark-mode .search-box input {
            background: transparent !important;
            color: #f8fafc !important;
        }

        body.dark-mode .icon-btn {
            background: #334155 !important;
            color: #f8fafc !important;
        }
    `;

    document.head.appendChild(darkStyles);

    function applyTheme() {
        const darkEnabled =
            localStorage.getItem("darkMode") === "true";

        document.body.classList.toggle(
            "dark-mode",
            darkEnabled
        );

        if (themeBtn) {
            themeBtn.innerHTML = darkEnabled
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            const currentlyDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "darkMode",
                String(!currentlyDark)
            );

            applyTheme();
        });
    }

    applyTheme();

    // ==========================================
    // 6. CARD HOVER ANIMATIONS
    // ==========================================

    document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.style.boxShadow =
                "0 18px 40px rgba(37,99,235,.18)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.08)";
        });
    });

    // ==========================================
    // 7. HIDE PAGE LOADER
    // ==========================================

    const loader = document.getElementById("pageLoader");

    if (loader) {
        loader.style.display = "none";
    }

    console.log("CampusMate Dashboard Ready!");
});

