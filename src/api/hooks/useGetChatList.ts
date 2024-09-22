import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { GetChatListResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getChatListPath = () => `${BASE_URL}/api/chat/all`;

export const getChatList = async () => {
    const response = await fetchInstance.get<GetChatListResponse>(getChatListPath(), {
        headers: {
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response.data;
};

export const useGetChatList = () => {
    const ChatListQueryKey = [getChatListPath()];

    return useQuery({
        queryKey: ChatListQueryKey,
        queryFn: () => getChatList(),
    });
};
