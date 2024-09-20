import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/common/MainLayout";
import { GlobalStyle } from "./globals";
import ChatPage from "./pages/ChatPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import MyPage from "./pages/MyPage";
import PostPage from "./pages/PostPage";
import ReissuePage from "./pages/ReissuePage";
import SelectPage from "./pages/SelectPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index path="/" element={<MainPage />} />
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/select" element={<SelectPage />} />
                    <Route path="/post" element={<PostPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/my" element={<MyPage />} />
                    <Route path="/reissue" element={<ReissuePage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
