/**
 * Format a date string into different formats
 * @param dateString - ISO date string
 * @param format - Optional format (default, short, long, relative)
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  format: 'default' | 'short' | 'long' | 'relative' = 'default'
): string => {
  const date = new Date(dateString)

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }

  // Declare variables outside of case blocks
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInMonths / 12)

  switch (format) {
    case 'short':
      // Format: MM/DD/YYYY
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    case 'long':
      // Format: Month DD, YYYY at HH:MM AM/PM
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })

    case 'relative':
      // Format: X days/hours/minutes ago
      if (diffInSeconds < 60) {
        return 'just now'
      }

      if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
      }

      if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
      }

      if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
      }

      if (diffInMonths < 12) {
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`
      }

      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`

    default:
      // Format: YYYY-MM-DD
      return date.toISOString().split('T')[0]
  }
}
