import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

interface PutFoodProps {
    foodId: string;
    formData: FormData;
}
const putFood = async ({ foodId, formData }: PutFoodProps) => {
    const response = await fetchInstance.put(`${BASE_URL}/api/food/${foodId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authSessionStorage.get()?.token}`,
        },
    });
    return response.data;
};

export const usePutFood = () => {
    return useMutation({
        mutationFn: (putFoodData: PutFoodProps) => putFood(putFoodData),
    });
};
