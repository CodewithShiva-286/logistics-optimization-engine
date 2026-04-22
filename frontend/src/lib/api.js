const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function apiRequest(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok || payload.success === false) {
      throw new Error(payload.message || "Request failed.");
    }

    return payload.data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Unable to reach the backend API.");
    }

    throw error;
  }
}

export const api = {
  signup(body) {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  login(body) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  getAllRequests() {
    return apiRequest("/requests");
  },
  getUserRequests(userId) {
    return apiRequest(`/requests/user/${userId}`);
  },
  createRequest(body) {
    return apiRequest("/requests", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  getAllDriverRoutes() {
    return apiRequest("/drivers");
  },
  getDriverRoutes(driverId) {
    return apiRequest(`/drivers/${driverId}`);
  },
  createDriverRoute(body) {
    return apiRequest("/drivers", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  findMatchesByRequest(requestId) {
    return apiRequest(`/match/${requestId}`);
  },
  createMatch(body) {
    return apiRequest("/match", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  acceptMatch(matchId) {
    return apiRequest("/match/accept", {
      method: "POST",
      body: JSON.stringify({ matchId }),
    });
  },
  rejectMatch(matchId) {
    return apiRequest("/match/reject", {
      method: "POST",
      body: JSON.stringify({ matchId }),
    });
  },
};
