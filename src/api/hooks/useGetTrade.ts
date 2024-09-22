import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { GetTradeResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getTradePath = () => `${BASE_URL}/api/my/trading-list`;

export const getTrade = async () => {
    const response = await fetchInstance.get<GetTradeResponse>(getTradePath(), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const useGetTrade = () => {
    const tradeQueryKey = [getTradePath()];

    return useQuery({
        queryKey: tradeQueryKey,
        queryFn: () => getTrade(),
    });
};
