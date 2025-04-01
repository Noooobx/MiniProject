export const checkAuth = async () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const res = await fetch(`${baseUrl}/api/auth/check`, {
        credentials: "include",
      });
  
      const data = await res.json();
      return data.authenticated; // Should return true if logged in
    } catch (error) {
      console.error("Auth check failed:", error);
      return false;
    }
  };
  