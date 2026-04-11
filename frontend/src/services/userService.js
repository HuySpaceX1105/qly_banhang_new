import { privateAxios } from "../api/privateAxiosCilent";

export const getUserListService = async(page, size, keyword, signal) => {
    const res = await privateAxios.get(
        "/user/list",
        {
            params: {page, size, keyword},
            signal
        }
    );

    return res.data;
}

export const addUserService = async (username, email, fullName, selectedRoles, selectedStatus) => {
    await privateAxios.post(
        "/user/add",
        {
            username,
            email,
            fullName,
            selectedRoles,
            selectedStatus
        }
    );
};