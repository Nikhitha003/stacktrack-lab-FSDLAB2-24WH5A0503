// TODO: Set the base URL for your API

const BASE_URL = "http://localhost:5000"; 

export async function fetchTasks(search) {
  try {
    const res = await fetch(`${BASE_URL}/api/tasks?search=${search}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return [];
  }
}