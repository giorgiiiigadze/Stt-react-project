import { useState } from "react";
import { useLogin } from "../../hooks/registration_hooks/useLogin";
import { useNavigate } from "react-router-dom";
import "../../css/registration/Login.css";

function Login() {
  const { login, loading, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) navigate("/");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{display: 'flex', flexDirection: 'column', marginBottom: '30px'}}>
          <span style={{color: '#7a7a7aff'}}>Your AI workspace.</span>
          <span>Log in to your Notion account</span>
        </h2>
        
        <div className="social-buttons">
          <button className="social google"><span>Continue with Google</span></button>
          <button className="social apple"><span>Continue with Apple</span></button>
          <button className="social microsoft"><span>Continue with Microsoft</span></button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email address..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p className="footer-text">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
