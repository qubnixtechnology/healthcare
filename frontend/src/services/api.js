const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const data = await response.json().catch(() => ({}));
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
