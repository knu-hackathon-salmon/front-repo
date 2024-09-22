import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { GetWishListResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getWishListPath = () => `${BASE_URL}/api/my/wish-list`;

export const getWishList = async () => {
    const response = await fetchInstance.get<GetWishListResponse>(getWishListPath(), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
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
