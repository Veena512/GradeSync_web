// Simulated user and exam data
const users = [
    { id: '1', email: 'faculty@edu.com', password: 'faculty', role: 'faculty', name: 'Prof. Johnson' },
    { id: '2', email: 'student@edu.com', password: 'student', role: 'student', name: 'Alice Smith' }
];

const exams = [
    {
        id: 'exam1',
        title: 'Computer Science Fundamentals',
        subject: 'Computer Science',
        time_limit: 60,
        questions: [
            {
                text: 'What does CPU stand for?',
                options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Processor Unit', 'Computer Processing Unit'],
                correct_option: 0
            },
            {
                text: 'Which is a programming language?',
                options: ['Windows', 'Excel', 'Python', 'Chrome'],
                correct_option: 2
            }
        ]
    }
];

let currentUser = null;

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginMessage = document.getElementById('login-message');

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('dashboard').style.display = 'grid';
        showSection('profile');
    } else {
        loginMessage.textContent = 'Invalid credentials';
        loginMessage.style.color = 'red';
    }
}

function logout() {
    currentUser = null;
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function showSection(section) {
    const contentArea = document.getElementById('content-area');

    switch (section) {
        case 'profile':
            contentArea.innerHTML = `
                <h2>User Profile</h2>
                <p>Name: ${currentUser.name}</p>
                <p>Email: ${currentUser.email}</p>
                <p>Role: ${currentUser.role}</p>
            `;
            break;

        case 'create-exam':
            if (currentUser.role !== 'faculty') {
                contentArea.innerHTML = '<p>Access Denied. Faculty only.</p>';
                return;
            }
            contentArea.innerHTML = `
                <h2>Create Exam</h2>
                <input type="text" placeholder="Exam Title">
                <select>
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                </select>
                <input type="number" placeholder="Time Limit (minutes)">
                <button>Create Exam</button>
            `;
            break;

        case 'available-exams':
            if (currentUser.role !== 'student') {
                contentArea.innerHTML = '<p>Access Denied. Students only.</p>';
                return;
            }
            contentArea.innerHTML = `
                <h2>Available Exams</h2>
                ${exams.map(exam => `
                    <div class="exam-card">
                        <h3>${exam.title}</h3>
                        <p>Subject: ${exam.subject}</p>
                        <p>Time Limit: ${exam.time_limit} minutes</p>
                        <button onclick="startExam('${exam.id}')">Start Exam</button>
                    </div>
                `).join('')}
            `;
            break;

        case 'exam-results':
            contentArea.innerHTML = '<h2>Exam Results</h2><p>No results available.</p>';
            break;
    }
}

function startExam(examId) {
    const exam = exams.find(e => e.id === examId);
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
        <h2>${exam.title}</h2>
        <div id="exam-questions">
            ${exam.questions.map((q, index) => `
                <div class="question">
                    <p>${index + 1}. ${q.text}</p>
                    ${q.options.map((opt, optIndex) => `
                        <label>
                            <input type="radio" name="q${index}" value="${optIndex}">
                            ${opt}
                        </label>
                    `).join('')}
                </div>
            `).join('')}
        </div>
        <button onclick="submitExam()">Submit Exam</button>
    `;
}

function submitExam() {
    alert('Exam submitted successfully!');
    showSection('available-exams');
}
