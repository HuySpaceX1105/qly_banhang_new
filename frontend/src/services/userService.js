import { privateAxios } from "../api/privateAxiosCilent";

export const getUserListService = async(page, size, keyword) => {
    const res = await privateAxios.get(
        "/user/list",
        {
            params: {page, size, keyword}
        }
    );

    return res.data;
}