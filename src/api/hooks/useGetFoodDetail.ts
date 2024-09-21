import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { PostFoodDetailResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getFoodDetailPath = (foodId: string) => `${BASE_URL}/api/food/detail/${foodId}`;

export const getFoodDetail = async (foodId: number): Promise<PostFoodDetailResponse> => {
    const response = await fetchInstance.get<PostFoodDetailResponse>(getFoodDetailPath(foodId.toString()), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()?.token}`,
        },
    });
    return response.data;
};

export const useFoodDetail = (foodId: number) => {
    const foodDetailQueryKey = [getFoodDetailPath(foodId.toString())];

    return useQuery({
        queryKey: foodDetailQueryKey,
        queryFn: () => getFoodDetail(foodId),
    });
};
