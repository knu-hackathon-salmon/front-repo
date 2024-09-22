import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { GetUserInfoResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getUserInfoPath = (type: string) => `${BASE_URL}/api/my/${type}`;

export const getUserInfo = async (type: string) => {
    const response = await fetchInstance.get<GetUserInfoResponse>(getUserInfoPath(type), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const useGetUserInfo = (type: string) => {
    const userInfoQueryKey = [getUserInfoPath(type)];

    return useQuery({
        queryKey: userInfoQueryKey,
        queryFn: () => getUserInfo(type),
    });
};
