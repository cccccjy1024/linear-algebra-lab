export interface ProgressState {
  completedSections: string[]
  quizScores: Record<string, { best: number; last: number }>
  bookmarks: string[]
}

const KEY = 'la-progress-v1'

const empty: ProgressState = {
  completedSections: [],
  quizScores: {},
  bookmarks: []
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as ProgressState
    return {
      completedSections: parsed.completedSections ?? [],
      quizScores: parsed.quizScores ?? {},
      bookmarks: parsed.bookmarks ?? []
    }
  } catch {
    return empty
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable; ignore
  }
}

export function unmarkComplete(sectionId: string): ProgressState {
  const state = loadProgress()
  state.completedSections = state.completedSections.filter((id) => id !== sectionId)
  saveProgress(state)
  return state
}
export function markComplete(sectionId: string): ProgressState {
  const state = loadProgress()
  if (!state.completedSections.includes(sectionId)) state.completedSections.push(sectionId)
  saveProgress(state)
  return state
}

export function recordQuiz(sectionId: string, score: number, total: number): ProgressState {
  const state = loadProgress()
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const prev = state.quizScores[sectionId]
  state.quizScores[sectionId] = {
    best: Math.max(prev?.best ?? 0, pct),
    last: pct
  }
  saveProgress(state)
  return state
}

export function toggleBookmark(sectionId: string): ProgressState {
  const state = loadProgress()
  const i = state.bookmarks.indexOf(sectionId)
  if (i >= 0) state.bookmarks.splice(i, 1)
  else state.bookmarks.push(sectionId)
  saveProgress(state)
  return state
}
