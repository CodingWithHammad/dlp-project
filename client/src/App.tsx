import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Resgiter";
import ForgetPassword from "@/pages/ForgetPassword";
import ResetPassword from "@/pages/ResetPassword";
import { Dashboard } from "./pages/Dashboard";
import Logout from "./components/Auth/Logout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgetPassword />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
}

export default App;
