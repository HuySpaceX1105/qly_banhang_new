import { publicAxios } from "../api/publicAxiosCilent";

export const loginService = async (username, password) => {
    const res = await publicAxios.post(
        "auth/login", 
        { 
            username, 
            password 
        }
    );
    
    const auth = res.data;
    console.log(auth);

    localStorage.setItem(
        "auth", 
        JSON.stringify(res.data)
    );

    return auth;
}

export const logoutService = async () => {
    try {
        await publicAxios.post(
            "auth/logout",
            {},
            {withCredentials: true}
        );
    } catch (error) {
        console.log(error);
    } finally {
       localStorage.removeItem("auth");
    }
}

export const registerService = async (data) => {
    try {
        await publicAxios.post(
            "auth/register", 
            data
        );
    } catch (error) {
        console.log(error);
    }
}

export const refreshTokenService = async () => {
    const res = await publicAxios.post(
        "auth/refresh-token",
        {}, 
        {withCredentials: true}
    );

    const auth = res.data;
    console.log(auth);

    localStorage.setItem(
        "auth", 
        JSON.stringify(res.data)
    );
    return res.data;
}    