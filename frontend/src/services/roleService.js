import { privateAxios } from "../api/privateAxiosCilent";

export const getRoleListService = async() => {
    const res = await privateAxios.get("/role/list");
    return res.data;
}