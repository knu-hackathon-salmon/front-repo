import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./Routes/ProtectedRoute";
import MainLayout from "./components/common/MainLayout";
import { GlobalStyle } from "./globals";
import ChatPage from "./pages/ChatPage";
import DetailPage from "./pages/DetailPage";
// import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import MyPage from "./pages/MyPage";
import PostPage from "./pages/PostPage";
import ReissuePage from "./pages/ReissuePage";
import SelectPage from "./pages/SelectPage";
import SignUpPage from "./pages/SignUpPage";
import TempPage from "./pages/TempPage";

function App() {
    const protectedRoutes = [
        { path: "/", element: <MainPage /> },
        { path: "/sign-up", element: <SignUpPage /> },
        { path: "/select", element: <SelectPage /> },
        { path: "/post", element: <PostPage /> },
        { path: "/chat", element: <ChatPage /> },
        { path: "/my", element: <MyPage /> },
        { path: "/map", element: <MapPage /> },
        { path: "/detail/:id", element: <DetailPage /> },
    ];
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/sign-in" element={<TempPage />} />
                    <Route path="/reissue" element={<ReissuePage />} />
                    {protectedRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
                    ))}
                </Route>
            </Routes>
        </>
    );
}

export default App;
