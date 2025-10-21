const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResp(res) {
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = text; }
  if (!res.ok) {
    const err = data?.message || data?.msg || data || 'Server error';
    throw { message: err };
  }
  return data;
}

export async function register(data) {
  const r = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResp(r);
}

export async function login(data) {
  const r = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResp(r);
}

export async function getTrains() {
  const r = await fetch(`${BASE}/api/trains`);
  return handleResp(r);
}

export async function createTrain(data) {
  const r = await fetch(`${BASE}/api/trains`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResp(r);
}

export async function bookTicket(data) {
  const r = await fetch(`${BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResp(r);
}

export async function getBookings() {
  const r = await fetch(`${BASE}/api/bookings/my`, { headers: { ...getAuthHeaders() } });
  return handleResp(r);
}

export async function cancelBooking(id) {
  const r = await fetch(`${BASE}/api/bookings/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  return handleResp(r);
}


// const BASE = "http://localhost:5000"; // if your backend on same origin keep empty or set 'http://localhost:5000'

// function getAuthHeaders() {
//   const token = localStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// export async function register(data) {
//   return fetch(`${BASE}/api/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
// }

// export async function login(data) {
//   return fetch(`${BASE}/api/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
// }

// export async function getTrains() {
//   return fetch(`${BASE}/api/trains`).then(r => r.json());
// }

// export async function createTrain(data) {
//   return fetch(`${BASE}/api/trains`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", ...getAuthHeaders() },
//     body: JSON.stringify(data),
//   }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
// }

// export async function bookTicket(data) {
//   return fetch(`${BASE}/api/bookings`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", ...getAuthHeaders() },
//     body: JSON.stringify(data),
//   }).then(r => r.json().then(j => { if (!r.ok) throw j; return j; }));
// }

// export async function getBookings() {
//   return fetch(`${BASE}/api/bookings`, { headers: getAuthHeaders() }).then(r => r.json());
// }

// export async function cancelBooking(id) {
//   return fetch(`${BASE}/api/bookings/${id}`, {
//     method: "DELETE", headers: getAuthHeaders()
//   }).then(r => {
//     if (!r.ok) return r.json().then(j => { throw j; });
//     return true;
//   });
// }
