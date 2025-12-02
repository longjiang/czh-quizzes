import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header.jsx';
import MetaText from './MetaText.jsx';
import Timer from './Timer.jsx';
import QuestionCard from './QuestionCard.jsx';
import Results from './Results.jsx';
import { fetchJson } from '../utils/helpers.js';

function App() {
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [status, setStatus] = useState('idle');
  const [answers, setAnswers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [result, setResult] = useState({ score: null, autoSubmitted: false });

  useEffect(() => {
    fetchJson('quizzes/courses.json')
      .then((data) => setCourses(data.courses || []))
      .catch(() => setCourses([]));
  }, []);

  useEffect(() => {
    if (!selectedCourseId) return;
    if (courseData[selectedCourseId]) return;

    fetchJson(`quizzes/${courses.find((c) => c.id === selectedCourseId)?.file || ''}`)
      .then((data) => {
        setCourseData((prev) => ({ ...prev, [selectedCourseId]: data }));
      })
      .catch(() => {
        setCourseData((prev) => ({ ...prev, [selectedCourseId]: null }));
      });
  }, [selectedCourseId, courses, courseData]);

  const selectedCourse = selectedCourseId ? courseData[selectedCourseId] : null;
  const selectedQuiz = useMemo(() => {
    if (!selectedCourse || !selectedQuizId) return null;
    return selectedCourse.quizzes.find((quiz) => quiz.id === selectedQuizId) || null;
  }, [selectedCourse, selectedQuizId]);

  useEffect(() => {
    if (status !== 'active') return undefined;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === 'active' && remainingSeconds <= 0) {
      finalizeQuiz(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds]);

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourseId(courseId);
    setSelectedQuizId('');
    setStatus('idle');
    setResult({ score: null, autoSubmitted: false });
    setAnswers([]);
    setRemainingSeconds(0);
    setTotalSeconds(0);
  };

  const handleQuizChange = (event) => {
    setSelectedQuizId(event.target.value);
    setStatus('idle');
    setResult({ score: null, autoSubmitted: false });
    setAnswers([]);
    setRemainingSeconds(0);
    setTotalSeconds(0);
  };

  const startQuiz = () => {
    if (!selectedQuiz || !selectedCourse) return;
    const perQuestion = selectedQuiz.timePerQuestionSeconds || selectedCourse.timePerQuestionSeconds || 60;
    const total = perQuestion * selectedQuiz.questions.length;
    setTotalSeconds(total);
    setRemainingSeconds(total);
    setAnswers(new Array(selectedQuiz.questions.length).fill(null));
    setStatus('active');
    setResult({ score: null, autoSubmitted: false });
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const finalizeQuiz = (autoSubmitted = false) => {
    if (!selectedQuiz) return;
    const score = selectedQuiz.questions.reduce((total, question, index) => {
      return total + (answers[index] === question.correctOption ? 1 : 0);
    }, 0);
    setStatus('finished');
    setResult({ score, autoSubmitted });
  };

  const resetQuiz = () => {
    setStatus('idle');
    setResult({ score: null, autoSubmitted: false });
    setAnswers([]);
    setRemainingSeconds(0);
    setTotalSeconds(0);
  };

  const disableSelectors = status === 'active';
  const showActions = status === 'active';
  const showQuestions = status !== 'idle' && selectedQuiz;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-900">
      <Header />
      <main className="relative max-w-6xl mx-auto px-4 pb-12 -mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[340px,1fr] gap-5">
          <section className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200/80 p-6 shadow-xl shadow-slate-900/5 space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold">1</div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Pick your course</h2>
                <div className="mt-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-600" htmlFor="course-select">
                    Course
                  </label>
                  <select
                    id="course-select"
                    className="w-full rounded-lg border border-slate-200 bg-white text-sm px-3 py-2 shadow-inner disabled:bg-slate-100"
                    value={selectedCourseId}
                    onChange={handleCourseChange}
                    disabled={disableSelectors}
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold">2</div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Choose a quiz</h2>
                <div className="mt-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-600" htmlFor="quiz-select">
                    Quiz
                  </label>
                  <select
                    id="quiz-select"
                    className="w-full rounded-lg border border-slate-200 bg-white text-sm px-3 py-2 shadow-inner disabled:bg-slate-100"
                    value={selectedQuizId}
                    onChange={handleQuizChange}
                    disabled={!selectedCourse || disableSelectors}
                  >
                    <option value="">Select a quiz</option>
                    {selectedCourse?.quizzes.map((quiz) => (
                      <option key={quiz.id} value={quiz.id}>
                        {quiz.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
              <MetaText quiz={selectedQuiz} course={selectedCourse} />
            </div>

            <button
              type="button"
              onClick={startQuiz}
              disabled={!selectedQuiz || status === 'active'}
              className="w-full inline-flex justify-center rounded-xl bg-gradient-to-r from-primary via-cyan-700 to-emerald-600 text-white font-semibold px-4 py-3 text-sm shadow-lg shadow-primary/30 hover:from-sky-900 hover:via-cyan-800 hover:to-emerald-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:bg-slate-200 disabled:text-slate-600 disabled:shadow-none disabled:border disabled:border-slate-300 disabled:hover:bg-slate-200 disabled:cursor-not-allowed"
            >
              Start Quiz
            </button>
          </section>

          <section className="bg-white/95 backdrop-blur rounded-2xl border border-slate-200/80 p-6 shadow-xl shadow-slate-900/5">
            {status === 'active' && <Timer totalSeconds={totalSeconds} remainingSeconds={remainingSeconds} />}

            {showQuestions && (
              <div className="flex flex-col gap-4" aria-live="polite">
                {selectedQuiz.questions.map((question, index) => (
                  <QuestionCard
                    key={question.id || index}
                    question={question}
                    index={index}
                    value={answers[index]}
                    disabled={status === 'finished'}
                    revealAnswers={status === 'finished'}
                    onChange={(value) => handleAnswerChange(index, value)}
                  />
                ))}
              </div>
            )}

            {showActions && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => finalizeQuiz(false)}
                  className="flex-1 rounded-xl bg-primary text-white font-semibold px-4 py-3 text-sm shadow-lg shadow-primary/30 hover:bg-sky-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="flex-1 rounded-xl border border-slate-200 text-primary font-semibold px-4 py-3 text-sm hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40"
                >
                  Reset
                </button>
              </div>
            )}

            {status === 'finished' && (
              <div className="mt-6 flex flex-col gap-3">
                <Results
                  score={result.score}
                  total={selectedQuiz?.questions.length || 0}
                  autoSubmitted={result.autoSubmitted}
                />
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="self-start rounded-xl border border-slate-200 text-primary font-semibold px-4 py-2 text-sm hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40"
                >
                  Start Over
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
