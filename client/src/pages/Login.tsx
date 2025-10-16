import LoginForm from "@/components/Auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100">
          <LoginForm />
        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
    </div>
  );
};

export default Login;
