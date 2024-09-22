import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

export const postTradeOnPath = (foodId: string) => `${BASE_URL}/api/food/trading/restart/${foodId}`;

const postTradeOn = async (foodId: string) => {
    const response = await fetchInstance.post(postTradeOnPath(foodId), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const usePostTradeOn = () => {
    return useMutation({
        mutationFn: (foodId: number) => postTradeOn(foodId.toString()),
    });
};
