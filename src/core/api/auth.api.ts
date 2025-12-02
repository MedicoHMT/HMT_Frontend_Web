import type { AxiosResponse } from "axios";
import api from "./api";

export interface LoginSentOTPPayload {
  value: string;
  type: string;
}
export interface LoginVerifyOTPPayload {
  value: string;
  type: string;
    otp: string;
}
export interface LoginResponse {
  accessToken: string;
}


export const authService = {
  loginSentOTP(data: LoginSentOTPPayload): Promise<AxiosResponse<String>> {
    return api.post("/api/auth/loginUser", null, {
        params: {
            value: data.value,
            type: data.type
        }
    });
  },

  loginVerifyOTP(data: LoginVerifyOTPPayload): Promise<AxiosResponse<LoginResponse>> {
    return api.post("/api/auth/verify-otp", null, {
        params: {
            value: data.value,
            type: data.type,
            otp: data.otp
        }
    });
  }



};