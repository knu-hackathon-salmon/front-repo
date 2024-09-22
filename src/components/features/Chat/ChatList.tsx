import styled from "styled-components";

import { ChatItem } from "./ChatItem";
import { ChatItemData } from "@/types";

export function ChatList({ chatItems }: { chatItems: ChatItemData[] }) {
    return (
        <Wrapper>
            {chatItems.map((item) => {
                return <ChatItem key={item.chatId} item={item} />;
            })}
        </Wrapper>
    );
}
const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    overflow: hidden;
    flex-direction: column;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;
