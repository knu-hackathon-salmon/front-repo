import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

const postWish = async (foodId: string) => {
    const response = await fetchInstance.post(`${BASE_URL}/api/wish/${foodId}`, {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const usePostWish = () => {
    return useMutation({
        mutationFn: (foodId: number) => postWish(foodId.toString()),
    });
};
