const courseSelect = document.getElementById('course-select');
const quizSelect = document.getElementById('quiz-select');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const questionArea = document.getElementById('question-area');
const resultsEl = document.getElementById('results');
const timerArea = document.getElementById('timer-area');
const timerDisplay = document.getElementById('timer-display');
const progressBar = document.getElementById('progress-bar');
const metaEl = document.getElementById('quiz-meta');
const actionsEl = document.getElementById('actions');

let courses = [];
const courseCache = new Map();
let currentCourse = null;
let currentQuiz = null;
let timerId = null;
let totalSeconds = 0;
let remainingSeconds = 0;

async function loadCourses() {
  const response = await fetch('quizzes/courses.json');
  const data = await response.json();
  courses = data.courses || [];
  courseSelect.innerHTML = '<option value="">Select a course</option>';
  courses.forEach((course) => {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = course.title;
    courseSelect.appendChild(option);
  });
}

async function loadCourseData(courseId) {
  const courseMeta = courses.find((c) => c.id === courseId);
  if (!courseMeta) return null;
  if (courseCache.has(courseId)) return courseCache.get(courseId);

  const response = await fetch(`quizzes/${courseMeta.file}`);
  const data = await response.json();
  courseCache.set(courseId, data);
  return data;
}

function resetState() {
  clearInterval(timerId);
  timerId = null;
  remainingSeconds = 0;
  totalSeconds = 0;
  timerArea.hidden = true;
  questionArea.hidden = true;
  actionsEl.hidden = true;
  resultsEl.hidden = true;
  questionArea.innerHTML = '';
  progressBar.style.width = '100%';
  startBtn.disabled = !currentQuiz;
  quizSelect.disabled = !currentCourse;
  courseSelect.disabled = false;
}

function updateMeta(quiz) {
  if (!quiz || !currentCourse) {
    metaEl.textContent = 'Select a course and quiz to see details.';
    return;
  }
  const timePerQuestion = quiz.timePerQuestionSeconds || currentCourse.timePerQuestionSeconds || 60;
  const minutes = quiz.questions.length;
  metaEl.textContent = `${quiz.questions.length} question(s) · ${minutes} minute(s) · ${timePerQuestion} sec/question`;
}

function renderQuestions(quiz) {
  questionArea.innerHTML = '';
  quiz.questions.forEach((question, index) => {
    const card = document.createElement('article');
    card.className = 'question-card';
    const title = document.createElement('h3');
    title.textContent = `${index + 1}. ${question.prompt}`;
    card.appendChild(title);

    const optionsList = document.createElement('div');
    optionsList.className = 'options';

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    question.options.forEach((optionText, optIndex) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q-${index}`;
      input.value = letters[optIndex];
      const optionSpan = document.createElement('span');
      optionSpan.textContent = `${letters[optIndex]}. ${optionText}`;

      optionLabel.appendChild(input);
      optionLabel.appendChild(optionSpan);
      optionsList.appendChild(optionLabel);
    });

    card.appendChild(optionsList);
    questionArea.appendChild(card);
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function startTimer() {
  timerArea.hidden = false;
  actionsEl.hidden = false;
  timerDisplay.textContent = formatTime(totalSeconds);
  progressBar.style.width = '100%';

  timerId = setInterval(() => {
    remainingSeconds -= 1;
    const progress = Math.max((remainingSeconds / totalSeconds) * 100, 0);
    progressBar.style.width = `${progress}%`;
    timerDisplay.textContent = formatTime(Math.max(remainingSeconds, 0));

    if (remainingSeconds <= 0) {
      clearInterval(timerId);
      timerId = null;
      finalizeQuiz(true);
    }
  }, 1000);
}

function computeScore() {
  const answers = [];
  let score = 0;

  currentQuiz.questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="q-${index}"]:checked`);
    const value = selected ? selected.value : null;
    answers.push(value);
    if (value === question.correctOption) {
      score += 1;
    }
  });

  return { score, answers };
}

function finalizeQuiz(autoSubmitted = false) {
  clearInterval(timerId);
  timerId = null;
  quizSelect.disabled = false;
  courseSelect.disabled = false;
  startBtn.disabled = false;

  const { score, answers } = computeScore();
  const total = currentQuiz.questions.length;
  resultsEl.hidden = false;
  resultsEl.innerHTML = `
    <div class="score">Score: ${score} / ${total}</div>
    <p>${autoSubmitted ? 'Time is up!' : 'Submission received.'}</p>
  `;

  questionArea.querySelectorAll('.question-card').forEach((card, index) => {
    const selected = answers[index];
    const correct = currentQuiz.questions[index].correctOption;
    const optionLabels = card.querySelectorAll('.option');

    optionLabels.forEach((label) => {
      const input = label.querySelector('input');
      input.disabled = true;
      const value = input.value;
      if (value === correct) {
        label.classList.add('correct');
      }
      if (selected && selected === value && selected !== correct) {
        label.classList.add('incorrect');
      }
    });
  });
}

function startQuiz() {
  if (!currentQuiz || !currentCourse) return;
  resetState();
  renderQuestions(currentQuiz);
  questionArea.hidden = false;
  resultsEl.hidden = true;
  const perQuestion = currentQuiz.timePerQuestionSeconds || currentCourse.timePerQuestionSeconds || 60;
  totalSeconds = perQuestion * currentQuiz.questions.length;
  remainingSeconds = totalSeconds;
  startBtn.disabled = true;
  quizSelect.disabled = true;
  courseSelect.disabled = true;
  startTimer();
}

courseSelect.addEventListener('change', async (event) => {
  const courseId = event.target.value;
  currentCourse = null;
  currentQuiz = null;
  resetState();
  quizSelect.innerHTML = '';
  quizSelect.disabled = true;
  startBtn.disabled = true;

  if (!courseId) return;

  const data = await loadCourseData(courseId);
  if (!data) return;
  currentCourse = data;

  quizSelect.innerHTML = '<option value="">Select a quiz</option>';
  data.quizzes.forEach((quiz) => {
    const option = document.createElement('option');
    option.value = quiz.id;
    option.textContent = quiz.title;
    quizSelect.appendChild(option);
  });
  quizSelect.disabled = false;
  updateMeta(null);
});

quizSelect.addEventListener('change', (event) => {
  if (!currentCourse) return;
  const quizId = event.target.value;
  currentQuiz = currentCourse.quizzes.find((q) => q.id === quizId) || null;
  resetState();
  if (currentQuiz) {
    startBtn.disabled = false;
    updateMeta(currentQuiz);
  }
});

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', () => finalizeQuiz(false));
resetBtn.addEventListener('click', resetState);

loadCourses();
