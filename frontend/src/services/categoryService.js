import { privateAxios } from "../api/privateAxiosCilent";

export const addCategoryService = async (data) => {
    const res = await privateAxios.post("/category/add", data);
};