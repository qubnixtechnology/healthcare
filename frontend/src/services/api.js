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
  adminDashboardStats: () => request('/admin/dashboard-stats'),
  adminEnquiries: () => request('/admin/enquiries'),
  createAdminEnquiry: (payload) => request('/admin/enquiries', { method: 'POST', body: JSON.stringify(payload) }),
  updateAdminEnquiry: (id, payload) => request(`/admin/enquiries?id=${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAdminEnquiry: (id) => request(`/admin/enquiries?id=${id}`, { method: 'DELETE' }),
  adminSolutions: () => request('/admin/solutions'),
  createAdminSolution: (payload) => request('/admin/solutions', { method: 'POST', body: JSON.stringify(payload) }),
  updateAdminSolution: (id, payload) => request(`/admin/solutions?id=${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAdminSolution: (id) => request(`/admin/solutions?id=${id}`, { method: 'DELETE' }),
  adminUsers: () => request('/admin/users'),
  createAdminUser: (payload) => request('/admin/users', { method: 'POST', body: JSON.stringify(payload) }),
  updateAdminUser: (id, payload) => request(`/admin/users?id=${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAdminUser: (id) => request(`/admin/users?id=${id}`, { method: 'DELETE' }),
  adminPendingOrders: () => request('/admin/pending-orders'),
  createAdminPendingOrder: (payload) => request('/admin/pending-orders', { method: 'POST', body: JSON.stringify(payload) }),
  updateAdminPendingOrder: (id, payload) => request(`/admin/pending-orders?id=${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAdminPendingOrder: (id) => request(`/admin/pending-orders?id=${id}`, { method: 'DELETE' }),
  stats: () => request('/admin/dashboard-stats'),
};
