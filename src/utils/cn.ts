/**
 * Lightweight className merger — no external dependency needed.
 * For complex merging with Tailwind conflict resolution, swap with clsx + tailwind-merge.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
