import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

interface PostChatResponse {
    id: number;
    content: string;
    createdAt: string;
}
const postChat = async (content: string) => {
    const response = await fetchInstance.post<PostChatResponse>(
        `${BASE_URL}/api/wishes`,
        {
            content,
        },
        {
            headers: {
                Authorization: `Bearer ${authSessionStorage.get()?.token}`,
            },
        },
    );
    return response.data;
};

export const usePostChat = () => {
    return useMutation({
        mutationFn: (content: string) => postChat(content),
    });
};
