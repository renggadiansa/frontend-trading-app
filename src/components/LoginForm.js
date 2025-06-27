
import { useState } from "react";

export default function LoginForm({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const user = "admin";
  const pass = "admin123";

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === user && form.password === pass) {
      localStorage.setItem("auth", "true");
      onLoginSuccess();
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
