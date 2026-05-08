export const checkAuth = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/auth/check`,
      {
        method: "GET",
        credentials: "include", // ✅ send cookies
      }
    );

    if (!response.ok) return false;
    const data = await response.json();
    return data.authenticated;
  } catch (error) {
    console.log(error)
    return false;
  }
};
