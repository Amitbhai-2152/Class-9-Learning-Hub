export function calculateScore(questions, answers) {
  return questions.reduce((score, question) => {
    return score + (answers[question.id] === question.answer ? (question.marks ?? 1) : 0);
  }, 0);
}

export function getAnsweredCount(questions, answers) {
  return questions.filter((question) => answers[question.id] !== undefined && answers[question.id] !== '').length;
}

export function getQuestionStatus(question, answers, currentIndex) {
  if (question.id === currentIndex) return 'current';
  if (answers[question.id] !== undefined && answers[question.id] !== '') return 'answered';
  return 'unanswered';
}

export function createResult(questions, answers) {
  const score = calculateScore(questions, answers);
  const maxScore = questions.reduce((sum, q) => sum + (q.marks ?? 1), 0);
  return { score, maxScore, percentage: maxScore ? Math.round((score / maxScore) * 100) : 0, answered: getAnsweredCount(questions, answers) };
}
