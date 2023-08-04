import LoginPage from "../screens/auth/LoginPage";
import HomePage from "../screens/home/HomePage";

export const RouteConfig = [
    {
        path: "/",
        element: <HomePage/>,
        special_access: "user"
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
];