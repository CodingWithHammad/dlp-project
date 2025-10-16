import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100">
          <ResetPasswordForm />
        </div>
      </div>
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-200 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
};

export default ResetPassword;
