const baseUrl = "http://localhost:7722"

export const serviceCall = <ReqBody, ResBody>(
  method: string,
  path: string,
  body?: ReqBody
): Promise<ResBody> =>
  fetch(baseUrl + path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(async response => {
      let result: any
      try {
        result = await response.json()
      } catch {
        result = null
      }
      return {
        result,
        ok: response.ok,
        status: response.status,
      }
    })
    .then(({ result, ok, status }) => {
      if (ok) return result
      throw {
        status,
        result,
      }
    })
