import { Navigate } from "react-router-dom";

import { authSessionStorage } from "@/utils/storage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const auth = authSessionStorage.get();

    if (!auth) {
        return <Navigate to="/sign-in" />;
    }

    return children;
};

export default ProtectedRoute;
