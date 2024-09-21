import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

const postTemp = async (email: string) => {
    const response = await fetchInstance.post(
        `${BASE_URL}/api/member/oauth2/temp`,
        { email },
        { withCredentials: true },
    );
    return response;
};
export const usePostTemp = () => {
    return useMutation({
        mutationFn: (email: string) => postTemp(email),
    });
};
