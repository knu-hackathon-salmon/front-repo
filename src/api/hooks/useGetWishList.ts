import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { GetWishListResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getWishListPath = () => `${BASE_URL}/api/wish`;

export const getWishList = async () => {
    const response = await fetchInstance.get<GetWishListResponse>(getWishListPath(), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()?.token}`,
        },
    });
    return response.data;
};

export const useGetWishList = () => {
    const wishListQueryKey = [getWishListPath()];

    return useQuery({
        queryKey: wishListQueryKey,
        queryFn: () => getWishList(),
    });
};
