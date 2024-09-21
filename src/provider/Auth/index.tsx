import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { authSessionStorage } from "@/utils/storage";

type AuthInfo = {
    token?: string;
    type?: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const currentAuthToken = authSessionStorage.get();
    const [isReady, setIsReady] = useState(false);

    const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

    useEffect(() => {
        if (currentAuthToken) {
            setAuthInfo({
                token: currentAuthToken.token,
                type: currentAuthToken.type,
            });
        }
        setIsReady(true);
    }, []);

    if (!isReady) return <></>;
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
