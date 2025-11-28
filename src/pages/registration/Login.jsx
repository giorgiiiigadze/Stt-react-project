import { useState } from "react";
import { loginUser } from "../../services/api";
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleLogin(e) {
        e.preventDefault()
        setError(null);
        
        try {
            const data = await loginUser(username, password);
            
            console.log("Logged in:", data);

        if (data.access) {
            localStorage.setItem("access_token", data.access);
        }
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            setError("Invalid email or password");
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
            <h2 >Login</h2>
        
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                />
                <button type="submit" >
                    Login
                </button>
                {error && <p style={{color:"red"}}>{error}</p>}

            </form>
        
            <p>
                Don’t have an account? <a href="/register">Register</a>
            </p>
            </div>
        </div>
    );
}

export default Login;
