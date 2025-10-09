export async function apiFetch(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Jika token expired → refresh otomatis
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch("http://localhost:3001/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await refreshRes.json();
    if (refreshRes.ok) {
      localStorage.setItem("accessToken", refreshData.data.ACCESS_TOKEN);
      localStorage.setItem("refreshToken", refreshData.data.REFRESH_TOKEN);

      // Ulangi request dengan token baru
      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${refreshData.data.ACCESS_TOKEN}`,
        },
      });
    } else {
      // Refresh gagal → logout
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  return res;
}
