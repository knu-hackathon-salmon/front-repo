import { useEffect, useRef } from "react";

import SockJS from "sockjs-client";

import { Client } from "@stomp/stompjs";

export function useWebSocket(onMessage: (message: string) => void) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => {
                if (typeof WebSocket !== "function") {
                    return new SockJS("http://local.corsmarket.ml/api/ws");
                }
                return new WebSocket("ws://local.corsmarket.ml/api/ws");
            },
            connectHeaders: {
                login: "user",
                passcode: "password",
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => console.log(str),
        });

        client.onConnect = () => {
            console.log("Connected to WebSocket");
            client.subscribe("/queue/test", (message) => onMessage(message.body));
        };

        client.onStompError = (frame) => {
            console.error("Broker reported error: " + frame.headers["message"]);
            console.error("Additional details: " + frame.body);
        };

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [onMessage]);

    const sendMessage = (destination: string, body: string) => {
        clientRef.current?.publish({ destination, body });
    };

    return { sendMessage };
}
