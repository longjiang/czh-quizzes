import React from 'react';

function MetaText({ quiz, course }) {
  if (!quiz || !course) return <p className="text-sm text-slate-500">Select a course and quiz to see details.</p>;
  const perQuestion = quiz.timePerQuestionSeconds || course.timePerQuestionSeconds || 60;
  return (
    <p className="text-sm text-slate-500">
      {quiz.questions.length} question(s) · {quiz.questions.length} minute(s) · {perQuestion} sec/question
    </p>
  );
}

export default MetaText;
