import { useEffect, useState } from "react";

export default function ReissuePage(): JSX.Element {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);

    useEffect(() => {
        console.log("Current Pathname:", window.location.pathname);

        if (window.location.pathname === "/reissue") {
            console.log("Sending request to backend");

            fetch("http://localhost:8080/api/jwt/access-token", {
                method: "GET",
                credentials: "include", // 쿠키를 포함시키기 위해 설정
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    console.log("Response Status:", response.status);

                    if (response.status === 200) {
                        console.log("Response status:", response.status);

                        // 응답 바디 읽기
                        return response.json().then((data) => {
                            console.log("Response Body:", data);

                            // 응답 바디에서 토큰 추출
                            const accessToken = response.headers.get("Authorization"); // 데이터에서 토큰을 추출
                            console.log("Access Token:", accessToken);

                            if (accessToken) {
                                console.log("Access Token:", accessToken);
                                setAccessToken(accessToken);
                                // 메인 페이지로 이동할 URL을 상태로 설정
                                setRedirectTo("http://localhost:5173");
                            }
                        });
                    } else {
                        console.error("Failed to reissue token:", response.status);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);

    useEffect(() => {
        if (redirectTo) {
            // 리다이렉션 처리
            window.location.href = redirectTo;
        }
    }, [redirectTo]);

    return (
        <div>
            <p>리프레시 중...</p>
        </div>
    );
}
