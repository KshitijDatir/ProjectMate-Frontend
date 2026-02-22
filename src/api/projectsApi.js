const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function fetchProjects(token) {
  const res = await fetch(`${API_BASE}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch projects")
  }

  return res.json()
}
export async function createProject(token, projectData) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to create project")
  }

  return data
}

