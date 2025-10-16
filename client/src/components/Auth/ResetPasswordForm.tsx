// import { useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const ResetPasswordForm = () => {
//   const [formData, setFormData] = useState({ email: "", otp: "", newPassword: "" });
//   const { resetPassword, loading, error } = useAuthStore();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await resetPassword(formData);
//   };

//   return (
//     <Card className="w-[350px] mx-auto mt-20">
//       <CardHeader>
//         <CardTitle>Reset Password</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input name="email" placeholder="Email" onChange={handleChange} />
//           <Input name="otp" placeholder="Enter OTP" onChange={handleChange} />
//           <Input
//             name="newPassword"
//             type="password"
//             placeholder="New Password"
//             onChange={handleChange}
//           />
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Updating..." : "Reset Password"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default ResetPasswordForm;




import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, Lock, Hash, AlertCircle, CheckCircle2 } from "lucide-react";

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({ email: "", otp: "", newPassword: "" });
  const [success, setSuccess] = useState(false);
  const { resetPassword, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await resetPassword(formData);
    if (result) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-500">Enter the OTP and create a new password</p>
      </div>

      {success ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-green-50 border-2 border-green-200">
            <div className="w-16 h-16 mb-4 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Password Reset Successful!</h3>
            <p className="text-gray-600 text-center">
              Your password has been updated. Redirecting to login...
            </p>
          </div>
        </div>
      ) : (
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
            <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
            <div className="relative">
              <Hash
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === "otp" ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <Input
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                onFocus={() => setFocusedField("otp")}
                onBlur={() => setFocusedField(null)}
                className="pl-11"
                maxLength={6}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === "newPassword" ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <Input
                name="newPassword"
                type="password"
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("newPassword")}
                onBlur={() => setFocusedField(null)}
                className="pl-11"
                required
              />
            </div>
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
                Resetting Password...
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>

          <div className="text-center">
            <Link
              to="/forgot"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Didn't receive OTP? Resend
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
