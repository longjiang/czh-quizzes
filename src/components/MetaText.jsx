import React from 'react';

function MetaText({ quiz, course }) {
  if (!quiz || !course) return <p className="text-sm text-slate-500">Select a course and quiz to see details.</p>;
  const perQuestion = quiz.timePerQuestionSeconds || course.timePerQuestionSeconds || 60;
  const totalSeconds = quiz.questions.length * perQuestion;
  const totalMinutes = Math.round((totalSeconds / 60) * 10) / 10;
  return (
    <p className="text-sm text-slate-500">
      {quiz.questions.length} question(s) · ~{totalMinutes} minute(s) total · {perQuestion} sec/question
    </p>
  );
}

export default MetaText;
