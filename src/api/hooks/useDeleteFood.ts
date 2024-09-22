import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

export const deleteFoodPath = (foodId: string) => `${BASE_URL}/api/food/${foodId}`;

const deleteFood = async (foodId: string) => {
    const response = await fetchInstance.delete(deleteFoodPath(foodId), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const useDeleteFood = () => {
    return useMutation({
        mutationFn: (foodId: number) => deleteFood(foodId.toString()),
    });
};
