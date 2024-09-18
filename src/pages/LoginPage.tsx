// LoginPage.tsx
import { useState } from "react";

export default function LoginPage(): JSX.Element {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    return (
        <div>
            {/* 구글 로그인 버튼 클릭 시 로그인 페이지로 이동 */}
            <button onClick={() => (window.location.href = "http://localhost:8080/login")}>구글 로그인</button>
            {accessToken && <p>Access Token: {accessToken}</p>}
        </div>
    );
}
