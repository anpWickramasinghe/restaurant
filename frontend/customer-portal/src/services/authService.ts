const BACKEND_URL =
  import.meta.env.VITE_API_GATEWAY_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:4000";

interface AuthResponse {
  accessToken: string;
  role: string;
  email: string;
}

interface UserData {
  email: string;
  name?: string;
  picture?: string;
  role: string;
  id?: string;
}

class AuthService {
  private refreshPromise: Promise<string> | null = null;

  /**
   * Store access token in localStorage
   */
  setAccessToken(token: string): void {
    localStorage.setItem("token", token);
  }

  /**
   * Get access token from localStorage
   */
  getAccessToken(): string | null {
    return localStorage.getItem("token");
  }

  /**
   * Store user data in localStorage
   */
  setUser(user: UserData): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Get user data from localStorage
   */
  getUser(): UserData | null {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken() && !!this.getUser();
  }

  /**
   * Refresh access token using refresh token (stored in HTTP-only cookie)
   */
  async refreshToken(): Promise<string> {
    // If there's already a refresh in progress, return that promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/customer/refresh`, {
          method: "POST",
          credentials: "include", // Important: Send cookies
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to refresh token");
        }

        const data: AuthResponse = await response.json();

        // Store new access token
        this.setAccessToken(data.accessToken);

        // Update user data if needed
        // Update user data if needed
        const currentUser = this.getUser();
        if (currentUser) {
          this.setUser({ ...currentUser, email: data.email, role: data.role });
        }

        return data.accessToken;
      } catch (error) {
        // If refresh fails, clear auth data
        this.clearAuth();
        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Make authenticated API request with automatic token refresh
   */
  async authenticatedFetch(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    let token = this.getAccessToken();

    if (!token) {
      throw new Error("No access token available");
    }

    // Add authorization header
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    // Make request
    let response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Send cookies for refresh token
    });

    // If token expired (401), try to refresh and retry
    if (response.status === 401) {
      try {
        token = await this.refreshToken();

        // Retry with new token
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
      } catch (error) {
        // Refresh failed, redirect to login
        window.location.href = "/login?error=session_expired";
        throw error;
      }
    }

    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint to revoke refresh token
      await fetch(`${BACKEND_URL}/auth/customer/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local auth data regardless of API call result
      this.clearAuth();
    }
  }

  /**
   * Clear all authentication data
   */
  clearAuth(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  /**
   * Setup automatic token refresh before expiration
   * Call this on app initialization
   */
  setupAutoRefresh(): () => void {
    // Access token expires in 1 hour
    // Refresh it 10 minutes before expiration (50 minutes = 3000000ms)
    const refreshInterval = 50 * 60 * 1000;

    // Immediately check if token needs refresh (e.g., user returned to tab after being away)
    if (this.isAuthenticated()) {
      this.checkAndRefreshToken();
    }

    const intervalId = setInterval(async () => {
      if (this.isAuthenticated()) {
        try {
          await this.refreshToken();
          console.log("[Auth] Token proactively refreshed");
        } catch (error) {
          console.error("Auto-refresh failed:", error);
          clearInterval(intervalId);
        }
      } else {
        clearInterval(intervalId);
      }
    }, refreshInterval);

    // Return cleanup function
    return () => clearInterval(intervalId);
  }

  /**
   * Check if token is expired or about to expire, and refresh if needed
   */
  private async checkAndRefreshToken(): Promise<void> {
    const token = this.getAccessToken();
    if (!token) return;

    try {
      // Parse JWT to check expiry
      const parts = token.split(".");
      if (parts.length !== 3) return;

      const payload = JSON.parse(atob(parts[1]));
      if (!payload.exp) return;

      const expiresAt = payload.exp * 1000;
      const now = Date.now();
      const bufferMs = 10 * 60 * 1000; // 10 minutes buffer

      // If token expires within buffer time, refresh it
      if (now >= expiresAt - bufferMs) {
        console.log("[Auth] Token expiring soon, refreshing...");
        await this.refreshToken();
      }
    } catch (e) {
      console.error("Error checking token expiry:", e);
    }
  }
}

export const authService = new AuthService();
