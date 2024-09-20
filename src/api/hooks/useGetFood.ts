import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
// import type { ChatData } from "@/types";
import { useMutation } from "@tanstack/react-query";

interface FoodMainOverviewResponse {
    status: boolean;
    code: number;
    message: string;
    data: {
        [key: string]: {
            foodId: number;
            shopImageUrl: string;
            shopName: string;
            foodImageUrl: string;
            title: string;
            likesCount: number;
            roadAddress: string;
            remainingTime: string;
            distance: number;
            price: number;
        }[];
    };
}

const getFoodMainOverview = async (latitude: number, longitude: number): Promise<FoodMainOverviewResponse> => {
    const response = await fetchInstance.get<FoodMainOverviewResponse>(`${BASE_URL}/api/food/main/overview`, {
        params: {
            latitude,
            longitude,
        },
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()?.token}`,
        },
    });
    return response.data;
};

interface PostFoodDetailResponse {
    status: boolean;
    code: number;
    message: string;
    data: {
        foodId: number;
        shopImageUrl: string;
        shopName: string;
        title: string;
        price: number;
        likesCount: number;
        roadAddress: string;
        businessHours: string;
        phoneNumber: string;
        stock: number;
        expiration: string;
        content: string;
        foodImages: string[];
    };
}

const getFoodDetail = async (foodId: number): Promise<PostFoodDetailResponse> => {
    const response = await fetchInstance.get<PostFoodDetailResponse>(`${BASE_URL}/api/food/detail/${foodId}`);
    return response.data;
};

// 음식 개요를 가져오기 위한 훅
export const useFoodMainOverview = () => {
    return useMutation({
        mutationFn: (coordinates: { latitude: number; longitude: number }) =>
            getFoodMainOverview(coordinates.latitude, coordinates.longitude),
    });
};

// 음식 세부 정보를 가져오기 위한 훅
export const useFoodDetail = () => {
    return useMutation({
        mutationFn: (foodId: number) => getFoodDetail(foodId),
    });
};
