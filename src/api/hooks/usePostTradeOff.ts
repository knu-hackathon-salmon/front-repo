import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

export const postTradeOffPath = (foodId: string) => `${BASE_URL}/api/food/trading/complete/${foodId}`;

const postTradeOff = async (foodId: string) => {
    const response = await fetchInstance.post(postTradeOffPath(foodId), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const usePostTradeOff = () => {
    return useMutation({
        mutationFn: (foodId: number) => postTradeOff(foodId.toString()),
    });
};
