export async function loginService(username, password) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}

export async function logoutService() {
    const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Logout failed");
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

export async function refreshTokenService() {
    const res = await fetch("http://localhost:8080/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
    });

    if(!res.ok) {
        throw new Error("Refresh token failed");
    }

    return res.json();
}
