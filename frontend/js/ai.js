
document.addEventListener("DOMContentLoaded", function () {

    const chatBox = document.getElementById("chatBox");
    const input = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    const STORAGE_KEY = "campusmate_chat_v2";

    const responses = {

        "generate quiz": `📚 Java OOP Practice Quiz

1. What does OOP stand for?
A) Object-Oriented Programming
B) Online Operating Process
C) Open Object Protocol

Answer: A

2. Which keyword is used for inheritance in Java?
A) implement
B) extends
C) inherit

Answer: B

3. Which concept hides internal implementation details?
A) Encapsulation
B) Compilation
C) Recursion

Answer: A

4. Which method is the entry point of a standard Java application?
A) start()
B) run()
C) main()

Answer: C

5. Which keyword creates an object in Java?
A) new
B) class
C) object

Answer: A

✅ Quiz Complete! Review any answers you missed.`,

        "create study plan": `📅 Your 7-Day CSE Study Plan

Day 1 — Data Structures
Revise arrays, linked lists and stacks.

Day 2 — Java Programming
Practice OOP concepts and exception handling.

Day 3 — DBMS
Study normalization, SQL joins and keys.

Day 4 — Computer Networks
Revise OSI layers, TCP/IP and routing.

Day 5 — Operating Systems
Study processes, scheduling and deadlocks.

Day 6 — Artificial Intelligence
Revise search algorithms and machine learning basics.

Day 7 — Revision
Solve practice questions and review weak topics.

💡 Adjust the schedule to match your upcoming exams and deadlines.`,

        "prepare for viva": `🎤 CSE Viva Preparation — 10 Questions

1. What is OOP?
Programming based on classes and objects.

2. What is inheritance?
A mechanism where one class acquires features of another.

3. What is DBMS?
Software that stores, manages and retrieves data.

4. What is a primary key?
An attribute that uniquely identifies a table record.

5. What is normalization?
Organizing database tables to reduce redundancy.

6. What is an operating system?
Software that manages hardware and applications.

7. What is a process?
A program currently in execution.

8. What is an IP address?
A logical address identifying a device on a network.

9. What is machine learning?
A field where systems learn patterns from data.

10. What is an algorithm?
A finite sequence of steps to solve a problem.

✅ Practice answering each question aloud.`,

        "explain java oop": `☕ Java Object-Oriented Programming

Java uses classes and objects to organize programs.

The four main OOP principles are:

1. Encapsulation
Combining data and methods inside a class and controlling access to them.

2. Inheritance
Allowing one class to reuse or extend another class's functionality.

3. Polymorphism
Allowing the same method interface to behave differently depending on the object.

4. Abstraction
Showing essential functionality while hiding unnecessary implementation details.

Example:

class Student {
    String name;

    void display() {
        System.out.println(name);
    }
}

Student s = new Student();
s.name = "Alex";
s.display();

Here, Student is a class and s is an object.

⭐ Important for interviews: Classes, objects, constructors, inheritance and polymorphism.`,

        "revise dbms": `🗄️ DBMS Quick Revision

1. DBMS
Software used to manage databases.

2. Primary Key
Uniquely identifies each row.

3. Foreign Key
References a key in another or the same table.

4. Normalization
Reduces redundancy and helps maintain data integrity.

5. SQL
Language used to work with relational databases.

6. JOIN
Combines related rows from multiple tables.

7. ACID Properties
Atomicity, Consistency, Isolation and Durability.

8. Indexing
Helps speed up data retrieval.

9. Transaction
A logical unit of database operations.

10. ER Diagram
Represents entities, attributes and relationships.

⭐ Focus on normalization, SQL queries, joins and transactions for exams.`,

        "summarize today's notes": `📚 Notes Revision Assistant

I can help you organize a summary, but this demo cannot automatically read your saved notes yet.

For each topic, prepare:

1. Definition — explain the concept in one sentence.
2. Key Points — write three to five important facts.
3. Example — include one practical example.
4. Exam Focus — identify important formulas or diagrams.
5. Revision Question — test yourself.

💡 Open your Notes section and choose the subject you want to revise.`,

        "java": `☕ Java Programming

Java is a class-based, object-oriented programming language.

Important concepts:
• Classes and objects
• Inheritance and polymorphism
• Encapsulation and abstraction
• Exception handling
• Collections
• Interfaces

Practice by building a Student Management System using classes, ArrayLists and methods.`,

        "python": `🐍 Python Programming

Python is a high-level programming language commonly used in automation, AI, data analysis and web development.

Important concepts:
• Variables and data types
• Lists, tuples and dictionaries
• Functions
• Loops and conditions
• Classes and objects
• File handling

Practice by creating a simple student record manager.`,

        "dbms": `🗄️ Database Management Systems

DBMS helps store, retrieve, update and manage structured information.

Key concepts:
• Relational databases
• Primary and foreign keys
• SQL queries
• Normalization
• Transactions
• Indexing

Example SQL:

SELECT name FROM students WHERE marks > 80;`,

        "computer networks": `🌐 Computer Networks

Computer networks allow devices to exchange data.

Important topics:
• OSI model — 7 layers
• TCP/IP model
• IP addressing
• Ethernet
• Routing and switching
• DNS, HTTP and DHCP

⭐ For viva preparation, understand the purpose of every OSI layer.`,

        "cn": `🌐 Computer Networks

Focus on the OSI model, TCP/IP, Ethernet, ARP, IP addressing, routing and switching.

A router connects different networks, while a typical Layer 2 switch forwards Ethernet frames within a LAN.`,

        "operating system": `💻 Operating Systems

An operating system manages hardware resources and provides services to applications.

Important topics:
• Process management
• CPU scheduling
• Memory management
• Deadlocks
• File systems
• Virtual memory

Example: Windows, Linux and macOS.`,

        "os": `💻 Operating Systems

Revise processes, threads, scheduling algorithms, deadlocks, paging and virtual memory.

A process is a program in execution, while a thread is a unit of execution within a process.`,

        "machine learning": `🧠 Machine Learning

Machine learning enables computers to learn patterns from data.

Three major types:
1. Supervised Learning — learns from labeled examples.
2. Unsupervised Learning — discovers patterns in unlabeled data.
3. Reinforcement Learning — learns through rewards and feedback.

Examples include spam detection and recommendation systems.`,

        "artificial intelligence": `🤖 Artificial Intelligence

AI develops systems capable of performing tasks associated with human intelligence.

Important topics:
• Intelligent agents
• Search algorithms
• Knowledge representation
• Machine learning
• Natural language processing
• Neural networks

AI is the broader field, while machine learning is one approach within AI.`,

        "attendance": `📈 Attendance Management

Use the Attendance Tracker to record classes attended and missed.

Attendance percentage:

(Classes Attended ÷ Total Classes) × 100

Example:
40 attended out of 50 classes = 80%.

Check your university's actual minimum attendance requirements.`,

        "assignment": `📝 Assignment Management

1. Check your deadlines.
2. Break large assignments into smaller tasks.
3. Finish research before writing.
4. Review your work.
5. Mark assignments complete in CampusMate.

💡 Start with urgent assignments and those requiring the most preparation.`,

        "cgpa": `🎓 CGPA Preparation

CGPA summarizes academic performance across semesters.

For equally weighted semesters:

CGPA = Sum of SGPAs ÷ Number of Semesters

However, official CGPA calculations may use semester credit weights.

Use the CampusMate CGPA Calculator for a simple estimate.`,

        "interview": `💼 Technical Interview Preparation

Focus on:

1. DSA — arrays, strings, linked lists, trees.
2. OOP — inheritance, abstraction, polymorphism.
3. DBMS — SQL, joins, normalization.
4. OS — processes, scheduling, deadlocks.
5. CN — TCP/IP, HTTP, routing.

Also prepare to explain your projects, technical decisions and challenges.`,

        "resume": `📄 Resume Tips for CSE Students

• Keep your resume concise and readable.
• Highlight relevant programming languages.
• Include two to four meaningful projects.
• Explain technologies and contributions.
• Add GitHub and LinkedIn links.
• Include genuine certifications.
• Check spelling and formatting.

⭐ Projects with working demonstrations are particularly useful.`,

        "hello": "Hello! 👋 I can help you with CSE revision, quizzes, study plans and viva preparation.",

        "hi": "Hi! 📚 What subject would you like to study today?",

        "thanks": "You're welcome! Good luck with your studies! 🚀"
    };

    function appendMessage(type, text) {

        const message = document.createElement("div");
        message.className = "message " + type;

        const icon = document.createElement("div");
        icon.className = "icon";
        icon.textContent = type === "user" ? "🧑" : "🤖";

        const bubble = document.createElement("div");
        bubble.className = "text";
        bubble.textContent = text;
        bubble.style.whiteSpace = "pre-wrap";
        bubble.style.overflowWrap = "anywhere";

        message.appendChild(icon);
        message.appendChild(bubble);

        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;

        saveChat();
    }

    function saveChat() {
        try {
            const messages = [];

            chatBox.querySelectorAll(".message").forEach(function (message) {
                const bubble = message.querySelector(".text");

                if (bubble) {
                    messages.push({
                        type: message.classList.contains("user") ? "user" : "ai",
                        text: bubble.textContent
                    });
                }
            });

            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (error) {
            console.warn("Unable to save chat history.");
        }
    }

    function loadChat() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

            if (!Array.isArray(saved) || saved.length === 0) {
                return false;
            }

            chatBox.replaceChildren();

            saved.forEach(function (message) {
                if (
                    message &&
                    ["user", "ai"].includes(message.type) &&
                    typeof message.text === "string"
                ) {
                    appendMessage(message.type, message.text);
                }
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    function aiReply(question) {

        const text = question.toLowerCase().trim();

        const keys = Object.keys(responses).sort(function (a, b) {
            return b.length - a.length;
        });

        for (const key of keys) {
            if (text === key || text.includes(key)) {
                return responses[key];
            }
        }

        return `🤖 CampusMate AI Demo

I don't have a prepared answer for that question yet.

Try one of these:
• Generate quiz
• Create study plan
• Prepare for viva
• Explain Java OOP
• Revise DBMS

This version uses predefined educational responses rather than a live AI model.`;
    }

    function sendMessage() {

        const text = input.value.trim();

        if (!text) return;

        appendMessage("user", text);
        input.value = "";

        sendBtn.disabled = true;

        setTimeout(function () {
            appendMessage("ai", aiReply(text));
            sendBtn.disabled = false;
        }, 450);
    }

    sendBtn.addEventListener("click", sendMessage);

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    document.querySelectorAll(".prompt-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            input.value = button.textContent.trim();
            sendMessage();
        });
    });

    function updateStats() {
        document.getElementById("notesCount").textContent = "Demo";
        document.getElementById("assignmentCount").textContent = "Demo";
        document.getElementById("classCount").textContent = "Demo";
        document.getElementById("attendancePercent").textContent = "Demo";
    }

    const hasHistory = loadChat();

    if (!hasHistory) {
        chatBox.replaceChildren();

        appendMessage(
            "ai",
            "Hello! 👋 I'm CampusMate AI Demo Assistant.\n\nChoose a Quick Prompt to get started with quizzes, revision or study planning."
        );
    }

    updateStats();

    console.log("CampusMate AI Demo Assistant Ready!");
});
