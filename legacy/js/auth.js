// Demo-only account handling, backed by localStorage.
//
// Login and signup used to POST to https://masai-api-mocker.herokuapp.com,
// which no longer exists — every attempt failed. Since this is a front-end
// clone with no server of its own, accounts now live in the browser.
//
// This is NOT real authentication: passwords are stored in plain text and
// anyone with devtools can read or edit them. Do not reuse this anywhere real.

const USERS_KEY = "revv_users";
const SESSION_KEY = "revv_session";

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Returns { ok: true } or { ok: false, message } so callers can show the
// reason instead of guessing.
export function registerUser(details) {
  const username = (details.username || "").trim();
  const password = details.password || "";

  if (!username || !password) {
    return { ok: false, message: "Username and password are required" };
  }
  if (password.length < 4) {
    return { ok: false, message: "Password must be at least 4 characters" };
  }

  const users = readUsers();
  const taken = users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
  if (taken) {
    return { ok: false, message: "That username is already registered" };
  }

  users.push({
    name: (details.name || "").trim(),
    email: (details.email || "").trim(),
    username,
    password,
    mobile: (details.mobile || "").trim(),
    description: (details.description || "").trim(),
  });
  writeUsers(users);

  return { ok: true };
}

export function loginUser(username, password) {
  const match = readUsers().find(
    (user) =>
      user.username.toLowerCase() === (username || "").trim().toLowerCase() &&
      user.password === password
  );

  if (!match) {
    return { ok: false, message: "Invalid username or password" };
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ username: match.username, name: match.name })
  );
  return { ok: true, user: match };
}

export function currentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
