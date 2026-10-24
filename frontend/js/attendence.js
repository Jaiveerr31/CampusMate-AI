
document.addEventListener("DOMContentLoaded", function () {

    const STORAGE_KEY = "campusmate_attendance_v1";

    const initialSubjects = [
        { name: "Java Programming", attended: 46, total: 50 },
        { name: "Database Management", attended: 44, total: 50 },
        { name: "Operating System", attended: 39, total: 49 },
        { name: "Artificial Intelligence", attended: 45, total: 50 },
        { name: "Computer Networks", attended: 36, total: 49 },
        { name: "Python", attended: 47, total: 50 }
    ];

    const grid = document.getElementById("attendanceGrid");
    const form = document.getElementById("subjectForm");
    const message = document.getElementById("attendanceMessage");

    const overallElement = document.getElementById("overallAttendance");
    const totalElement = document.getElementById("totalSubjects");
    const safeElement = document.getElementById("safeSubjects");

    let subjects;

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved === null ? null : JSON.parse(saved);

        subjects = Array.isArray(parsed)
            ? parsed
            : initialSubjects.map(subject => ({
                ...subject,
                history: []
            }));
    } catch (error) {
        subjects = initialSubjects.map(subject => ({
            ...subject,
            history: []
        }));
    }

    subjects = subjects.filter(subject =>
        typeof subject.name === "string" &&
        Number.isSafeInteger(subject.attended) &&
        Number.isSafeInteger(subject.total) &&
        subject.attended >= 0 &&
        subject.total >= subject.attended
    ).map(subject => ({
        ...subject,
        history: Array.isArray(subject.history)
            ? subject.history
            : []
    }));

    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
            return true;
        } catch (error) {
            message.textContent = "Unable to save attendance in this browser.";
            return false;
        }
    }

    function percentage(attended, total) {
        if (total === 0) return 0;
        return Math.round((attended / total) * 100);
    }

    function render() {
        grid.replaceChildren();

        let attendedSum = 0;
        let totalSum = 0;
        let safeCount = 0;

        subjects.forEach((subject, index) => {

            const percent = percentage(subject.attended, subject.total);

            attendedSum += subject.attended;
            totalSum += subject.total;

            if (subject.total > 0 && percent >= 75) {
                safeCount++;
            }

            const card = document.createElement("div");
            card.className = "attendance-card";

            const topRow = document.createElement("div");
            topRow.className = "top-row";

            const title = document.createElement("h2");
            title.textContent = subject.name;

            const percentLabel = document.createElement("span");
            percentLabel.className = "percentage";

            percentLabel.classList.add(
                percent >= 85 ? "green" :
                percent >= 75 ? "yellow" : "red"
            );

            percentLabel.textContent = percent + "%";

            topRow.append(title, percentLabel);

            const progress = document.createElement("div");
            progress.className = "progress-bar";

            const fill = document.createElement("div");
            fill.className = "progress-fill";

            if (percent < 75) {
                fill.classList.add("red-fill");
            } else if (percent < 85) {
                fill.classList.add("yellow-fill");
            }

            fill.style.width = percent + "%";
            progress.appendChild(fill);

            const count = document.createElement("p");
            count.textContent =
                subject.attended + " / " + subject.total +
                " Classes Attended";

            const controls = document.createElement("div");
            controls.className = "attendance-controls";

            const presentBtn = document.createElement("button");
            presentBtn.className = "present-btn";
            presentBtn.textContent = "✓ Present";

            presentBtn.addEventListener("click", function () {
                const previous = {
                    attended: subject.attended,
                    total: subject.total
                };

                subject.history.push(previous);
                subject.attended++;
                subject.total++;

                save();
                render();
            });

            const absentBtn = document.createElement("button");
            absentBtn.className = "absent-btn";
            absentBtn.textContent = "✕ Absent";

            absentBtn.addEventListener("click", function () {
                subject.history.push({
                    attended: subject.attended,
                    total: subject.total
                });

                subject.total++;

                save();
                render();
            });

            const undoBtn = document.createElement("button");
            undoBtn.className = "undo-btn";
            undoBtn.textContent = "↶ Undo";
            undoBtn.disabled = subject.history.length === 0;

            undoBtn.addEventListener("click", function () {
                const previous = subject.history.pop();
                if (!previous) return;

                subject.attended = previous.attended;
                subject.total = previous.total;

                save();
                render();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", function () {
                if (!confirm("Delete " + subject.name + "?")) return;

                subjects.splice(index, 1);
                save();
                render();
            });

            controls.append(
                presentBtn,
                absentBtn,
                undoBtn,
                deleteBtn
            );

            card.append(topRow, progress, count, controls);
            grid.appendChild(card);
        });

        overallElement.textContent =
            percentage(attendedSum, totalSum) + "%";

        totalElement.textContent = subjects.length;
        safeElement.textContent = safeCount;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("subjectName").value.trim();
        const attended = Number(
            document.getElementById("attendedClasses").value
        );
        const total = Number(
            document.getElementById("totalClasses").value
        );

        if (!name ||
            !Number.isSafeInteger(attended) ||
            !Number.isSafeInteger(total) ||
            attended < 0 ||
            total < 0 ||
            attended > total) {

            message.textContent =
                "Enter a valid subject and class counts.";
            return;
        }

        if (subjects.some(subject =>
            subject.name.toLowerCase() === name.toLowerCase()
        )) {
            message.textContent = "This subject already exists.";
            return;
        }

        subjects.push({
            name: name,
            attended: attended,
            total: total,
            history: []
        });

        save();
        form.reset();
        message.textContent = "Subject added successfully!";
        render();
    });

    render();
    console.log("CampusMate Attendance Tracker Ready!");
});
