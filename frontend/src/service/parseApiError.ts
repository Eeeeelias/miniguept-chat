type ErrorCode = "CONTENT_TOO_LONG" | "MODEL_NOT_FOUND"

const errors: Record<ErrorCode, string> = {
  CONTENT_TOO_LONG: "Content too long",
  MODEL_NOT_FOUND: "Model not found",
}

interface ErrorResponse {
  error: ErrorCode
}

interface ApiError {
  status: number
  result: ErrorResponse
}

const isApiError = (response: unknown): response is ApiError =>
  typeof response === "object" &&
  response !== null &&
  "status" in response &&
  "result" in response

export const parseApiError = (response: unknown) => {
  const error = {
    message: "An unknown error occurred",
    status: 500,
  }
  if (isApiError(response)) {
    error.message = errors[response.result.error] || "An unknown error occurred"
    error.status = response.status || 500
  }
  return error
}
