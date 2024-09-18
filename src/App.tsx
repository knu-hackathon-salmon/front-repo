import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/common/MainLayout";
import ChatPage from "./pages/ChatPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import MyPage from "./pages/MyPage";
import SelectPage from "./pages/SelectPage";
import SettingPage from "./pages/SettingPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index path="/" element={<MainPage />} />
                <Route path="/sign" element={<LoginPage />} />
                <Route path="/select" element={<SelectPage />} />
                <Route path="/setting" element={<SettingPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/my" element={<MyPage />} />
            </Route>
        </Routes>
    );
}

export default App;
