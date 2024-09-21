import { Navigate } from "react-router-dom";

import { useAuth } from "@/provider/Auth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const authInfo = useAuth();

    if (!authInfo || !authInfo.token) {
        console.log(authInfo);
        return <Navigate to="/sign-in" />;
    }

    return children;
};

export default ProtectedRoute;
