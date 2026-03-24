export async function loginService(username, password) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
}