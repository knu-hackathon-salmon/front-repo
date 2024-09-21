import { useEffect, useRef } from "react";

import { authSessionStorage } from "@/utils/storage";

import { Client } from "@stomp/stompjs";

export function useWebSocket(onMessage: (message: string) => void) {
    const clientRef = useRef<Client | null>(null);

    const authToken = authSessionStorage.get();
    useEffect(() => {
        const client = new Client({
            brokerURL: `ws://localhost:8080/ws`, // WebSocket URL
            connectHeaders: {
                //token 수정 필요 ${authToken?.token}
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJiZmwxMjM0MTIzNEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9HT09HTEVfVVNFUiIsInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE3MjY4OTkyNTQsImV4cCI6MTcyNjkwMjg1NH0.yEec4zglum7UFTS_rc8hZlDa7DKRqXMY_aMYsadbYXs`,
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log("WebSocket 연결 성공!");

            client.subscribe(
                `/topic/chat/private/1`, // 채널 ID 사용
                (message) => {
                    const parsedMessage = JSON.parse(message.body);
                    onMessage(parsedMessage);
                },
                {
                    //${authToken?.token}`수정필요
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJiZmwxMjM0MTIzNEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9HT09HTEVfVVNFUiIsInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE3MjY4OTkyNTQsImV4cCI6MTcyNjkwMjg1NH0.yEec4zglum7UFTS_rc8hZlDa7DKRqXMY_aMYsadbYXs`,
                }, // 구독 시 Authorization 헤더 추가
            );
        };

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [onMessage, authToken?.token]);

    const sendMessage = (destination: string, body: string) => {
        clientRef.current?.publish({
            destination,
            body: JSON.stringify({
                content: body,
                messageId: "someUniqueId",
                chatId: "1",
                senderEmail: "exam@exam.com",
                senderName: "Name",
                createTime: new Date().toISOString(),
                Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJiZmwxMjM0MTIzNEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9HT09HTEVfVVNFUiIsInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE3MjY4OTkyNTQsImV4cCI6MTcyNjkwMjg1NH0.yEec4zglum7UFTS_rc8hZlDa7DKRqXMY_aMYsadbYXs`,
            }),
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJiZmwxMjM0MTIzNEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9HT09HTEVfVVNFUiIsInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE3MjY4OTkyNTQsImV4cCI6MTcyNjkwMjg1NH0.yEec4zglum7UFTS_rc8hZlDa7DKRqXMY_aMYsadbYXs",
            },
        });
        console.log(`Sent to ${destination}:`, body);
    };

    return { sendMessage };
}
