import { useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

import { styled } from "styled-components";

import { useWebSocket } from "@/api/hooks/useWebSocket";

export default function ChatPage() {
    const [messages, setMessages] = useState<string[]>([]);
    const chatInputRef = useRef<HTMLInputElement>(null);

    const { sendMessage } = useWebSocket((message) => {
        setMessages((prev) => [...prev, message]);
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const chatInput = chatInputRef.current;
        if (!chatInput) return;

        const chatValue = chatInput.value.trim();
        if (chatValue === "") return;

        sendMessage("/topic/general", chatValue);

        chatInput.value = "";
    };

    return (
        <>
            <InfoWrapper>
                <Image
                    src={
                        "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h51"
                    }
                />
                <Title>기황후</Title>
            </InfoWrapper>
            <ChatWrapper>
                <MessagesWrapper>
                    {messages.map((msg, index) => (
                        <Message key={index}>{msg}</Message>
                    ))}
                </MessagesWrapper>
                <SendWrapper onSubmit={handleSubmit}>
                    <input ref={chatInputRef} placeholder="채팅을 입력해주세요." />
                    <SendBtn type="submit">
                        <BsFillSendFill />
                    </SendBtn>
                </SendWrapper>
            </ChatWrapper>
        </>
    );
}

const InfoWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 20px 0;
`;

const Image = styled.img`
    width: 40px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
`;

const Title = styled.p`
    font-size: 16px;
    color: #126245;
    font-weight: bolder;
`;

const ChatWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const MessagesWrapper = styled.div`
    flex-grow: 1;
    padding: 10px;
    overflow-y: auto;
`;

const Message = styled.p`
    background: #e1f3e8;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 5px;
    word-wrap: break-word;
`;

const SendWrapper = styled.form`
    height: 46px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #126245;
    border-radius: 30px;
    position: relative;

    input {
        color: #1ca673;
        border: none;
        padding: 0 25px;
        width: 80%;
        background: none;
        font-size: 14px;
        resize: none;
        &:focus {
            outline: none;
        }
        &::placeholder {
            color: #1ca673;
        }
    }

    svg {
        color: #126245;
    }
`;

const SendBtn = styled.button`
    display: flex;
    width: 30px;
    height: 30px;
    border: none;
    background-color: #e1f3e8;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
`;
