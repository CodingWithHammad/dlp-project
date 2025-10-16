// import { useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const ForgetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const { forgetPassword, loading, error } = useAuthStore();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await forgetPassword({ email });
//   };

//   return (
//     <Card className="w-[350px] mx-auto mt-20">
//       <CardHeader>
//         <CardTitle>Forgot Password</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default ForgetPasswordForm;





import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { KeyRound, Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { forgetPassword, loading, error } = useAuthStore();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await forgetPassword({ email });
    if (result) {
      setSuccess(true);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
          <KeyRound className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-gray-500">No worries, we'll send you reset instructions</p>
      </div>

      {success ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-green-50 border-2 border-green-200">
            <div className="w-16 h-16 mb-4 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h3>
            <p className="text-gray-600 text-center">
              We've sent a password reset OTP to <span className="font-medium">{email}</span>
            </p>
          </div>
          <Link to="/reset">
            <Button className="w-full">Continue to Reset Password</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === "email" ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
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
                Sending OTP...
              </div>
            ) : (
              "Send Reset OTP"
            )}
          </Button>

          <Link to="/login">
            <Button variant="outline" className="w-full" type="button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default ForgetPasswordForm;
