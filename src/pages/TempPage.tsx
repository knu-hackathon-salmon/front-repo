import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosResponse } from "axios";
import { styled } from "styled-components";

import { usePostTemp } from "@/api/hooks/useTemp";

import { authSessionStorage } from "@/utils/storage";

export default function TempPage() {
    const [email, setEmail] = useState("");
    const { mutate: postTemp } = usePostTemp();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting email:", email);
        postTemp(email, {
            onSuccess: (response: AxiosResponse) => {
                const token = response.headers["authorization"];
                console.log("Authorization token:", token);
                authSessionStorage.set({
                    token: token,
                    type: "",
                });
                console.log("여기는됨");
                navigate("/select");
                console.log("여기는됨22");
            },
            onError: (error) => {
                console.error("Error occurred during request:", error);
            },
        });
    };
    return (
        <>
            임시회원가입
            <Form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    placeholder="메일"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                />
                <SubmitButton type="submit">시작 하기</SubmitButton>
            </Form>
        </>
    );
}
const InputField = styled.input`
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    @media screen and (min-width: 400px) {
        width: 75%;
    }
`;
const SubmitButton = styled.button`
    width: 80%;
    padding: 10px;
    border: none;
    background-color: #1ca673;
    color: white;
    border-radius: 100px;
    cursor: pointer;

    &:hover {
        background-color: #227e5c;
    }
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    align-items: center;
`;
