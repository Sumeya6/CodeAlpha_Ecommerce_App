import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { showToast } = useToast();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      showToast("Registered 🎉", "success");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      showToast(err.response?.data?.message || "Registration failed ❌", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md sm:p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-primary text-white w-full py-3 rounded font-medium hover:bg-primary-dark transition">
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}