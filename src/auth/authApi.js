const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Login failed")
  }

  return data
}

export async function registerUser(payload) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Registration failed")
  }

  return data
}

export async function googleLogin(token) {
  const res = await fetch(`${BASE_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Google Login failed")
  }

  return data
}
