export const backendURL = import.meta.env.VITE_BACKEND_URL || "https://codedevforge-codedevforge.up.railway.app/auth";
fetch(`${API_BASE}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password })
});