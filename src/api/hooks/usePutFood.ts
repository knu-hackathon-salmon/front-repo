import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

// 요청 본문을 정의하는 인터페이스
interface FoodUpdateDto {
    images: string[];
    updateFoodDto: {
        newTitle: string;
        newStock: number;
        newExpiration: string;
        newPrice: number;
        newContent: string;
        newFoodCategory: string; // 'MEAT'와 같은 특정 값을 가질 수 있으므로 필요 시 enum으로 정의할 수 있습니다.
        newTrading: boolean;
    };
}

// 응답을 정의하는 인터페이스
interface FoodPutResponse {
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

// PUT 요청을 위한 API 함수
const putFood = async (foodId: number, updateData: FoodUpdateDto): Promise<FoodPutResponse> => {
    const response = await fetchInstance.put<FoodPutResponse>(`${BASE_URL}/api/food/${foodId}`, updateData, {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()?.token}`,
        },
    });
    return response.data;
};

// PUT API를 위한 훅
export const usePutFood = () => {
    return useMutation({
        mutationFn: (params: { foodId: number; updateData: FoodUpdateDto }) =>
            putFood(params.foodId, params.updateData),
    });
};
