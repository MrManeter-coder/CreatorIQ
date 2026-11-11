
export function getErrorMessage(
  error,
  fallback = 'Something went wrong. Please try again.'
) {
  if (!error.response) {
    return 'Unable to reach the server. Please check that the backend is running.'
  }

  const detail = error.response.data?.detail

  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail) && detail.length > 0) {
    return detail
      .map((item) => item.msg?.replace(/^Value error, /, ''))
      .filter(Boolean)
      .join('. ')
  }

  return fallback
}
