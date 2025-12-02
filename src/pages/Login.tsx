import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../core/auth/AuthContext';
import { authService } from '../core/api/auth.api';



type LoginType = 'email' | 'username';


export default function Login() {
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';


  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState({
    value: "",
    type: "email" as LoginType,
  });
  
  const [otp, setOtp] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 'request') {
      await handleRequestOtp();
    } else {
      await handleVerifyOtp();
    }
  };

  const handleRequestOtp = async () => {
    try {
      setLoading(true);
      await authService.loginSentOTP(form); 
      setStep('verify');
    } catch (e) {
      setError('Failed to request OTP. Please check your credentials.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      const payload = {
        type: form.type,
        value: form.value,
        otp: otp
      };

      const res = await authService.loginVerifyOTP(payload);
      const access = res.data?.accessToken;
      
      if (access) {
        loginWithToken(access);
        navigate(from, { replace: true });
      } else {
        setError('Token missing in response');
      }
    } catch (e) {
      setError('Invalid OTP. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmail = () => {
    setStep('request');
    setOtp("");
    setError("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4 fw-bold">HMT Login</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label fw-semibold text-capitalize">
                {form.type}
              </label>
              {step === 'verify' && (
                <button 
                  type="button" 
                  onClick={handleEditEmail} 
                  className="btn btn-link btn-sm p-0 text-decoration-none"
                >
                  Edit
                </button>
              )}
            </div>
            
            <input
              type={form.type === "email" ? "email" : "text"}
              name="value"
              className="form-control"
              placeholder={`Enter ${form.type}`}
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              required
              disabled={step === 'verify'}
            />
          </div>

          <div className="d-flex justify-content-around mb-4 mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="loginType"
                id="typeEmail"
                value="email"
                checked={form.type === "email"}
                onChange={() => setForm({ ...form, type: "email" })}
                disabled={step === 'verify'} 
              />
              <label className="form-check-label" htmlFor="typeEmail">Email</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="loginType"
                id="typeUsername"
                value="username"
                checked={form.type === "username"}
                onChange={() => setForm({ ...form, type: "username" })}
                disabled={step === 'verify'}
              />
              <label className="form-check-label" htmlFor="typeUsername">Username</label>
            </div>
          </div>

          {step === 'verify' && (
            <div className="mb-3">
              <label className="form-label fw-semibold">OTP</label>
              <input
                type="text"
                name="otp"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                autoFocus
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading 
              ? (step === 'request' ? "Sending..." : "Verifying...") 
              : (step === 'request' ? "Send OTP" : "Verify OTP")
            }
          </button>
          
        </form>
      </div>
    </div>
  );
}