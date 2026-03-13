//made a fetch interceptor similar to axios instance

type FetchOptions = RequestInit & {
  next?: { revalidate?: number | false | 0; tags?: string[] };
};

const BASE_URL = process.env.BASE_URL;
console.log("BASE_URL:", BASE_URL);
if (!BASE_URL) throw new Error("BASE_URL environment variable is not set");
export async function customFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const url = new URL(path, BASE_URL).toString();
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
    });
  } catch (error) {
    console.error(`Fetch Error - Network on ${path}:`, error); //replace with logging to file or sth later
    throw error;
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `API Error ${response.status}: ${errorBody || response.statusText}`,
    );
  }

  const data: T = await response.json();

  if (Array.isArray(data) && data !== null) {
    console.info(`Path: ${path}`, data.slice(0, 1)); // prevent messy console, show only one array element
  } else {
    console.info(`Path: ${path}`, data);
  }
  return data;
}
