import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

// 음식 등록 API 응답 타입
interface PostFoodResponse {
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

// 음식 등록 API 호출 함수
const postFood = async (
    images: string[],
    createFoodDto: { title: string; stock: number; expiration: string; price: number; content: string },
): Promise<PostFoodResponse> => {
    const response = await fetchInstance.post<PostFoodResponse>(
        `${BASE_URL}/api/food`,
        {
            images,
            createFoodDto,
        },
        {
            headers: {
                Authorization: `Bearer ${authSessionStorage.get()?.token}`,
            },
        },
    );
    return response.data;
};

// 근처 음식 조회 API 응답 타입
interface PostFoodMapNearMeResponse {
    status: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        title: string;
        storeName: string;
        price: number;
        stock: number;
        latitude: number;
        longitude: number;
        imageUrl: string;
    }[];
}

// 근처 음식 조회 API 호출 함수
const postFoodMapNearMe = async (
    neLat: number,
    neLng: number,
    swLat: number,
    swLng: number,
    userLat: number,
    userLng: number,
): Promise<PostFoodMapNearMeResponse> => {
    const response = await fetchInstance.post<PostFoodMapNearMeResponse>(
        `${BASE_URL}/api/food/map/near/me`,
        {
            neLat,
            neLng,
            swLat,
            swLng,
            userLat,
            userLng,
        },
        {
            headers: {
                Authorization: `Bearer ${authSessionStorage.get()?.token}`,
            },
        },
    );
    return response.data;
};

// 근처 음식 박스 조회 API 응답 타입
interface PostFoodMapNearBoxResponse {
    status: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        title: string;
        storeName: string;
        price: number;
        stock: number;
        latitude: number;
        longitude: number;
        imageUrl: string;
    }[];
}

// 근처 음식 박스 조회 API 호출 함수
const postFoodMapNearBox = async (
    neLat: number,
    neLng: number,
    swLat: number,
    swLng: number,
    userLat: number,
    userLng: number,
): Promise<PostFoodMapNearBoxResponse> => {
    const response = await fetchInstance.post<PostFoodMapNearBoxResponse>(
        `${BASE_URL}/api/food/map/near/box`,
        {
            neLat,
            neLng,
            swLat,
            swLng,
            userLat,
            userLng,
        },
        {
            headers: {
                Authorization: `Bearer ${authSessionStorage.get()?.token}`,
            },
        },
    );
    return response.data;
};

// 음식 등록 API 훅
export const usePostFood = () => {
    return useMutation({
        mutationFn: ({
            images,
            createFoodDto,
        }: {
            images: string[];
            createFoodDto: { title: string; stock: number; expiration: string; price: number; content: string };
        }) => postFood(images, createFoodDto),
    });
};

// 근처 음식 조회 API 훅
export const usePostFoodMapNearMe = () => {
    return useMutation({
        mutationFn: (params: {
            neLat: number;
            neLng: number;
            swLat: number;
            swLng: number;
            userLat: number;
            userLng: number;
        }) => postFoodMapNearMe(params.neLat, params.neLng, params.swLat, params.swLng, params.userLat, params.userLng),
    });
};

// 근처 음식 박스 조회 API 훅
export const usePostFoodMapNearBox = () => {
    return useMutation({
        mutationFn: (params: {
            neLat: number;
            neLng: number;
            swLat: number;
            swLng: number;
            userLat: number;
            userLng: number;
        }) =>
            postFoodMapNearBox(params.neLat, params.neLng, params.swLat, params.swLng, params.userLat, params.userLng),
    });
};
