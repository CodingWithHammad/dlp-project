// import { useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate, Link } from "react-router-dom";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const { register, loading, error } = useAuthStore();
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await register(formData);
//     navigate("/login");
//   };

//   return (
//     <Card className="w-[350px] mx-auto mt-20">
//       <CardHeader>
//         <CardTitle>Register</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input name="name" placeholder="Full Name" onChange={handleChange} />
//           <Input name="email" placeholder="Email" onChange={handleChange} />
//           <Input
//             name="password"
//             type="password"
//             placeholder="Password"
//             onChange={handleChange}
//           />
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Creating..." : "Register"}
//           </Button>
//           <div className="text-sm text-center mt-2">
//             <Link to="/login" className="text-blue-600">Already have an account?</Link>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default RegisterForm;



import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
    navigate("/login");
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-500">Join us and start your journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <User
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                focusedField === "name" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <Input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                focusedField === "email" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="pl-11"
              required
            />
          </div>
          {formData.password && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      i < passwordStrength ? getStrengthColor() : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Password strength: <span className="font-medium">{getStrengthText()}</span>
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-1 duration-300">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Create Account
            </div>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
