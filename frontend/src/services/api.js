const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const STORAGE_KEY = 'curaveris-auth-user';

function authHeader() {
  try {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  } catch {
    return {};
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeader(), ...(options.headers || {}) },
    ...options,
  });
  const raw = await response.text();
  const clean = raw.replace(/^\uFEFF+/, '');
  const data = clean ? JSON.parse(clean) : {};
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  products: () => request('/products'),
  login: (payload) => request('/auth.php?action=login', { method: 'POST', body: JSON.stringify(payload) }),
  signup: (payload) => request('/auth.php?action=signup', { method: 'POST', body: JSON.stringify(payload) }),
  contact: (payload) => request('/contact.php', { method: 'POST', body: JSON.stringify(payload) }),
  stats: () => request('/dashboard.php'),
};
