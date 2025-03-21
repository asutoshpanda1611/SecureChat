import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SENDER_USERNAME = import.meta.env.VITE_SENDER_USERNAME;
const SENDER_PASSWORD = import.meta.env.VITE_SENDER_PASSWORD;
const RECEIVER_USERNAME = import.meta.env.VITE_RECEIVER_USERNAME;
const RECEIVER_PASSWORD = import.meta.env.VITE_RECEIVER_PASSWORD;

function Auth() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (credentials.username === SENDER_USERNAME && credentials.password === SENDER_PASSWORD) {
      sessionStorage.setItem("auth", "sender");
      navigate("/sender");
    } else if (credentials.username === RECEIVER_USERNAME && credentials.password === RECEIVER_PASSWORD) {
      sessionStorage.setItem("auth", "receiver");
      navigate("/receiver");
    } else {
      setError("Invalid Credentials");
    }
  };  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <button 
          onClick={handleLogin} 
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300">
          Login
        </button>
      </div>
    </div>
  );
}

export default Auth;
