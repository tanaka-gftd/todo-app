import './bootstrap';
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//ページ表示用コンポーネント
import Home from './Pages/HomePage/HomePage';
import UserLogin from './Pages/UserLoginPage/UserLoginPage';
import UserRegister from './Pages/UserRegisterPage/UserRegisterPage';
import UserProfile from './Pages/UserProfilePage/UserProfilePage';
import UserForgotPassword from './Pages/UserForgotPassword/UserForgotPassword';
import NoMatch from './Pages/ErrorPage/NoMatch';

//表示部分(SPA)
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/forgot-password" element={<UserForgotPassword />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
}

//レンダリングする場所を、welcome.blade.php内から取得
const root = ReactDOM.createRoot(document.getElementById("app"));

//レンダリング
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
