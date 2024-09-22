import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { FoodMainOverviewResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getMainFood = async (latitude: number, longitude: number): Promise<FoodMainOverviewResponse> => {
    const response = await fetchInstance.get(
        `${BASE_URL}/api/food/main/overview?latitude=${latitude}&longitude=${longitude}`,
        {
            headers: {
                Authorization: `Bearer ${authSessionStorage.get()}`,
            },
        },
    );
    return response.data;
};

export const useGetMainFood = (latitude: number, longitude: number) =>
    useQuery({
        queryKey: ["mainFoodList", latitude, longitude],
        queryFn: () => getMainFood(latitude, longitude),
    });
