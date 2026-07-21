/** Truncate a string to maxLength and append ellipsis */
export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str

/** Convert a string to a URL-safe slug */
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Format a number with locale-aware commas */
export const formatNumber = (n: number, locale = 'en-US'): string =>
  new Intl.NumberFormat(locale).format(n)

/** Format a date string to a readable format */
export const formatDate = (date: string | Date, locale = 'en-US'): string =>
  new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(date),
  )
