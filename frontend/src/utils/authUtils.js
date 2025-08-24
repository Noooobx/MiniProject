export const checkAuth = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/check`,
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
