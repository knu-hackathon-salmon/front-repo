import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

const postFood = async (formData: FormData) => {
    const response = await fetchInstance.post(`${BASE_URL}/api/food`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const usePostFood = () => {
    return useMutation({
        mutationFn: (formData: FormData) => postFood(formData),
    });
};
