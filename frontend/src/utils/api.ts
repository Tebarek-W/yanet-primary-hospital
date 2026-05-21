/**
 * Central API client for the Yanet Hospital CMS backend.
 * All functions throw on non-ok HTTP responses.
 */

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5002/api';

const fetchJSON = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

const jsonBody = (data: unknown): RequestInit => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

export const api = {
  // ─── Doctors ────────────────────────────────────────────────────────────────
  doctors: {
    getAll: () => fetchJSON(`${API_BASE}/doctors`),
    getById: (id: string) => fetchJSON(`${API_BASE}/doctors/${id}`),
    create: (data: unknown) =>
      fetchJSON(`${API_BASE}/doctors`, { method: 'POST', ...jsonBody(data) }),
    update: (id: string, data: unknown) =>
      fetchJSON(`${API_BASE}/doctors/${id}`, { method: 'PUT', ...jsonBody(data) }),
    delete: (id: string) =>
      fetchJSON(`${API_BASE}/doctors/${id}`, { method: 'DELETE' }),
  },

  // ─── Services ───────────────────────────────────────────────────────────────
  services: {
    getAll: () => fetchJSON(`${API_BASE}/services`),
    getBySlug: (slug: string) => fetchJSON(`${API_BASE}/services/${slug}`),
    create: (data: unknown) =>
      fetchJSON(`${API_BASE}/services`, { method: 'POST', ...jsonBody(data) }),
    update: (slug: string, data: unknown) =>
      fetchJSON(`${API_BASE}/services/${slug}`, { method: 'PUT', ...jsonBody(data) }),
    delete: (slug: string) =>
      fetchJSON(`${API_BASE}/services/${slug}`, { method: 'DELETE' }),
  },

  // ─── Blog Posts ─────────────────────────────────────────────────────────────
  blog: {
    getAll: () => fetchJSON(`${API_BASE}/blog`),
    getById: (id: string) => fetchJSON(`${API_BASE}/blog/${id}`),
    create: (data: unknown) =>
      fetchJSON(`${API_BASE}/blog`, { method: 'POST', ...jsonBody(data) }),
    update: (id: string, data: unknown) =>
      fetchJSON(`${API_BASE}/blog/${id}`, { method: 'PUT', ...jsonBody(data) }),
    delete: (id: string) =>
      fetchJSON(`${API_BASE}/blog/${id}`, { method: 'DELETE' }),
  },

  // ─── Careers ────────────────────────────────────────────────────────────────
  careers: {
    getVacancies: () => fetchJSON(`${API_BASE}/careers/vacancies`),
    getVacancyById: (id: string) =>
      fetchJSON(`${API_BASE}/careers/vacancies/${id}`),
    createVacancy: (data: unknown) =>
      fetchJSON(`${API_BASE}/careers/vacancies`, { method: 'POST', ...jsonBody(data) }),
    updateVacancy: (id: string, data: unknown) =>
      fetchJSON(`${API_BASE}/careers/vacancies/${id}`, { method: 'PUT', ...jsonBody(data) }),
    deleteVacancy: (id: string) =>
      fetchJSON(`${API_BASE}/careers/vacancies/${id}`, { method: 'DELETE' }),
    getInternships: () => fetchJSON(`${API_BASE}/careers/internships`),
    createInternship: (data: unknown) =>
      fetchJSON(`${API_BASE}/careers/internships`, { method: 'POST', ...jsonBody(data) }),
    updateInternship: (id: string, data: unknown) =>
      fetchJSON(`${API_BASE}/careers/internships/${id}`, { method: 'PUT', ...jsonBody(data) }),
    deleteInternship: (id: string) =>
      fetchJSON(`${API_BASE}/careers/internships/${id}`, { method: 'DELETE' }),
  },

  // ─── Branches ───────────────────────────────────────────────────────────────
  branches: {
    getAll: () => fetchJSON(`${API_BASE}/branches`),
    getBySlug: (slug: string) => fetchJSON(`${API_BASE}/branches/${slug}`),
    create: (data: unknown) =>
      fetchJSON(`${API_BASE}/branches`, { method: 'POST', ...jsonBody(data) }),
    update: (slug: string, data: unknown) =>
      fetchJSON(`${API_BASE}/branches/${slug}`, { method: 'PUT', ...jsonBody(data) }),
    delete: (slug: string) =>
      fetchJSON(`${API_BASE}/branches/${slug}`, { method: 'DELETE' }),
  },

  // ─── Pages (CMS) ────────────────────────────────────────────────────────────
  pages: {
    get: (pageId: string) => fetchJSON(`${API_BASE}/pages/${pageId}`),
    save: (pageId: string, data: unknown) =>
      fetchJSON(`${API_BASE}/pages/${pageId}`, { method: 'PUT', ...jsonBody(data) }),
  },
};
