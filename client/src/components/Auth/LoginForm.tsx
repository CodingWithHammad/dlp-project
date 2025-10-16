// import { useState } from "react";
// import { Button } from "../ui/button"; 
// import { Input } from "../ui/input"; 
// import { useAuthStore } from "@/store/authStore";

// const LoginForm = () => {
//     const { login, loading, error } = useAuthStore();
//     const [form, setForm] = useState({ email: "", password: "" });

//     const handleSubmit = async (e : any) => {
//         e.preventDefault();
//         await login(form);
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-md border">
//             <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <Input
//                     type="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={(e : any) => setForm({ ...form, email: e.target.value })}
//                     required
//                 />
//                 <Input
//                     type="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={(e : any) => setForm({ ...form, password: e.target.value })}
//                     required
//                 />
//                 <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? "Logging in..." : "Login"}
//                 </Button>
//             </form>
//             {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
//         </div>
//     );
// };

// export default LoginForm;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm = () => {
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form);
    navigate("/");
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Sign in to continue to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                focusedField === "email" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                focusedField === "password" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <Input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            to="/forgot"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-1 duration-300">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
