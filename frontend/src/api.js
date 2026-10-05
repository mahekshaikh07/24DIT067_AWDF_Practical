// One place for the backend address. Change it here and every call follows.
const BASE_URL = 'http://localhost:5000';

// Your Practical 5 (MongoDB) routes are mounted at /mongo-tasks in server.js.
// (/tasks is the Practical 4 in-memory version, so we do NOT use it here.)
const API_URL = `${BASE_URL}/mongo-tasks`;

// Small wrapper so every call handles errors the same way.
async function request(path = '', options = {}) {
  const config = { ...options };

  // Backend's jsonValidator needs this header on POST/PUT.
  if (options.body) {
    config.headers = { 'Content-Type': 'application/json' };
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, config);
  } catch {
    // fetch only throws when the request never reached the server
    throw new Error('Cannot reach the server. Is the backend running on port 5000?');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // response had no JSON body, that's fine
  }

  if (!res.ok) {
    // backend sends { error: "..." } on failures
    throw new Error(data?.error || `Request failed (status ${res.status})`);
  }
  return data;
}

export const getTasks = () => request();

export const createTask = (task) =>
  request('', { method: 'POST', body: JSON.stringify(task) });

export const updateTask = (id, changes) =>
  request(`/${id}`, { method: 'PUT', body: JSON.stringify(changes) });

export const deleteTask = (id) => request(`/${id}`, { method: 'DELETE' });
