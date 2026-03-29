export const handleApiError = (error) => {
    if(!error.response) return {
        status: 500,
        code: "NETWORK_ERROR",
        message: "Không kết nối được server"
    };

    const data = error.response.data;

    if(data?.code && data?.message) {
        return {
            status: data.status,
            code: data.code,
            message: data.message
        }
    }

    return {
        message: "Lỗi không xác định",
        code: "UNKNOWN_ERROR"
    }; 
};