import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, Mail, Lock, User, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import type { RegisterData } from "@/types/auth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null as File | null,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  // 🧠 Password strength logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files?.[0]) {
      setFormData({ ...formData, profileImage: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "password") {
        let strength = 0;
        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[^A-Za-z0-9]/.test(value)) strength++;
        setPasswordStrength(strength);
      }
    }
  };

  // 🧾 Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: RegisterData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      profileImage: formData.profileImage ?? undefined,
    };

    await register(payload);
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
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-2 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <p className="text-gray-500 text-sm">Join us and start your journey</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "name" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "email" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "password" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="pl-10"
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

            {/* Profile Image */}
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image (required)</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="cursor-pointer"
                  required
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <Alert variant="destructive" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Creating Account...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Create Account
              </>
            )}
          </Button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
