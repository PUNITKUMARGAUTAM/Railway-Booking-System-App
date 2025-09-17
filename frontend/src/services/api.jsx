const BASE = "http://localhost:5000"; // if your backend on same origin keep empty or set 'http://localhost:5000'

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function register(data) {
  return fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
}

export async function login(data) {
  return fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
}

export async function getTrains() {
  return fetch(`${BASE}/api/trains`).then(r => r.json());
}

export async function createTrain(data) {
  return fetch(`${BASE}/api/trains`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
}

export async function bookTicket(data) {
  return fetch(`${BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
}

export async function getBookings() {
  return fetch(`${BASE}/api/bookings`, { headers: getAuthHeaders() }).then(r => r.json());
}

export async function cancelBooking(id) {
  return fetch(`${BASE}/api/bookings/${id}`, {
    method: "DELETE", headers: getAuthHeaders()
  }).then(r => {
    if (!r.ok) return r.json().then(j => { throw j; });
    return true;
  });
}
