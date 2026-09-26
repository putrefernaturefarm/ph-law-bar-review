import { addDays } from 'date-fns'

export interface ReviewResult {
  newEaseFactor: number
  newIntervalDays: number
  nextReviewAt: Date
}

export function calculateNextReview(
  wasCorrect: boolean,
  easeFactor: number,
  intervalDays: number
): ReviewResult {
  if (wasCorrect) {
    const newInterval = intervalDays <= 1 ? 3 : Math.round(intervalDays * easeFactor)
    const newEase = Math.min(3.0, easeFactor + 0.1)
    return {
      newEaseFactor: newEase,
      newIntervalDays: newInterval,
      nextReviewAt: addDays(new Date(), newInterval),
    }
  }

  const newEase = Math.max(1.3, easeFactor - 0.2)
  return {
    newEaseFactor: newEase,
    newIntervalDays: 1,
    nextReviewAt: addDays(new Date(), 1),
  }
}
