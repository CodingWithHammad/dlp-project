import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Resgiter";
import ForgetPassword from "@/pages/ForgetPassword";
import ResetPassword from "@/pages/ResetPassword";
import { Dashboard } from "./pages/Dashboard";
import Logout from "./components/Auth/Logout";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import { Contact, Library } from "lucide-react";
import Courses from "./pages/Courses";
import Roadmap from "./pages/Roadmap";
// import Score from "./pages/Score";
import ChatBot from "./pages/ChatBot";
// import VapiAgent from "./pages/VapiAgent";
function App() {
  return (
    <Routes>

      {/* All pages that use Layout must be children */}
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courses" element={<Courses />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="library" element={<Library />} />

      </Route>

      {/* pages that should NOT show layout */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgetPassword />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/logout" element={<Logout />} />

    </Routes>
  )
}

export default App;
