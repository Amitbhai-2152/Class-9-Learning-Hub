const KEY = 'class9-learning-progress';

export function loadProgress() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

export function saveProgress(progress) {
  localStorage.setItem(KEY, JSON.stringify(progress));
}

export function markStageComplete(chapterId, stage) {
  const progress = loadProgress();
  progress[chapterId] = { ...(progress[chapterId] || {}), [stage]: true };
  saveProgress(progress);
  return progress;
}

export function getChapterProgress(chapterId) {
  const progress = loadProgress()[chapterId] || {};
  const completed = ['learn','practice','challenge','test'].filter((stage) => progress[stage]).length;
  return Math.round((completed / 4) * 100);
}
