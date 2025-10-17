export interface UserType {
  name?: string;
  email?: string;
  role?: string;
  _id?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AuthState {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  forgetPassword: (data: ForgetPasswordData) => Promise<any>;
  resetPassword: (data: ResetPasswordData) => Promise<any>;
}
