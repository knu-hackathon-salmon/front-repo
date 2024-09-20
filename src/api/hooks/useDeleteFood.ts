import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
// import type { ChatData } from "@/types";
import { useMutation } from "@tanstack/react-query";

interface FoodDeleteResponse {
    status: boolean;
    code: number;
    message: string;
}

const deleteFood = async (foodId: number): Promise<FoodDeleteResponse> => {
    const response = await fetchInstance.delete<FoodDeleteResponse>(`${BASE_URL}/api/food/${foodId}`);
    return response.data;
};

// DELETE API를 위한 훅
export const useDeleteFood = () => {
    return useMutation({
        mutationFn: (foodId: number) => deleteFood(foodId),
    });
};
