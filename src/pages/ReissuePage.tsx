import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BASE_URL, fetchInstance } from "@/api/instance";

import { authSessionStorage, typeSessionStorage } from "@/utils/storage";

export default function ReissuePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const requestReissue = async () => {
            if (window.location.pathname === "/reissue") {
                console.log("Sending request to backend");
                try {
                    const response = await fetchInstance.get(`${BASE_URL}/api/jwt/reissue`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    });

                    console.log("Response Status:", response.status);
                    const accessToken = response.headers["authorization"];
                    console.log("Access Token:", accessToken);

                    if (response.status === 200) {
                        console.log("Response Body:", response.data);
                        const type = response.headers["type"] ?? undefined;

                        if (accessToken) {
                            authSessionStorage.set(accessToken);
                            typeSessionStorage.set(type);
                            navigate("/");
                        }
                    } else if (response.status === 201) {
                        console.log("Response Body:", response.data);

                        if (accessToken) {
                            authSessionStorage.set(accessToken);
                            navigate("/select");
                        }
                    } else {
                        console.error("Failed to reissue token:", response.status, response.data);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        requestReissue();
    }, [navigate]);

    return (
        <div>
            <p>리프레시 중...</p>
        </div>
    );
}
