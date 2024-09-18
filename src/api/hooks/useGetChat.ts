import { BASE_URL, fetchInstance } from "../instance";
// import type { ChatData } from "@/types";
import { useQuery } from "@tanstack/react-query";

// export type ChatResponseData = ChatData[];
interface ChatResponseData {
    id: number;
    content: string;
    createdAt: string;
}

export const getChatPath = () => `${BASE_URL}/api/chat`;
const ChatQueryKey = [getChatPath()];

export const getChat = async () => {
    const response = await fetchInstance.get<ChatResponseData>(getChatPath());
    return response.data;
};

export const useGetChat = () =>
    useQuery({
        queryKey: ChatQueryKey,
        queryFn: getChat,
    });
