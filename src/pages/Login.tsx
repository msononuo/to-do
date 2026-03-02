import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../components/useUser.js";

type LoginForm = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

function Login() {
  const [user, setUser] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const { setToken } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { username, password } = user;

  const submitting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post<LoginResponse>(
        "https://dummyjson.com/user/login",
        {
          username,
          password,
        }
      );

      setToken(data.accessToken);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={submitting}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            placeholder="Username"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;