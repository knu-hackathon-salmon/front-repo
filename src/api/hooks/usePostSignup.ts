import { authSessionStorage } from "@/utils/storage";

import { BASE_URL, fetchInstance } from "../instance";
import { useMutation } from "@tanstack/react-query";

interface PostSignupProps {
    type: string;
    formData: FormData;
}
const postSignup = async ({ type, formData }: PostSignupProps) => {
    const response = await fetchInstance.post(`${BASE_URL}/api/member/${type}/sign-up`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authSessionStorage.get()}`,
        },
    });
    return response;
};

export const usePostSignup = () => {
    return useMutation({
        mutationFn: (signupData: PostSignupProps) => postSignup(signupData),
    });
};
