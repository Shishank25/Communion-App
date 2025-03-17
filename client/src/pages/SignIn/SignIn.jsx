import { useState, useContext } from "react";
import React from "react";
import { AppContext } from "../../AppContext";
import axiosInstance from "../../utils/axiosInstance";

const SignIn = () => {
  const [mode, setMode] = useState("Login");

  const { setUser, setSignedIn, setIsSigning } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before validation

    const { name, email, password } = formData;

    if (mode === "Login") {
      if (!email || !password) {
        setError("Please fill all required fields.");
        return;
      }
    } else {
      if (!name || !email || !password) {
        setError("Please fill all required fields.");
        return;
      }
    }

    try {
      const endpoint = mode === "Login" ? "/login" : "/register";
      const payload =
        mode === "Login"
          ? { email, password }
          : { fullName: name, email, password };

      const response = await axiosInstance.post(endpoint, payload);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setUser({ fullName: response.data.fullName, email });
        setSignedIn(true);
        setIsSigning(false);
        setFormData({ name: "", email: "", password: "" }); // Clear form after success
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="w-80 bg-[#dad4cd] shadow-lg rounded-lg overflow-hidden">
      {/* Tabs for Login / Register */}
      <div className="flex">
        <button
          className={`w-1/2 py-3 text-center cursor-pointer ${
            mode === "Register"
              ? "border-b-2 border-indigo-500 font-bold text-indigo-600"
              : "text-gray-500"
          }`}
          onClick={() => setMode("Register")}
        >
          Register
        </button>
        <button
          className={`w-1/2 py-3 text-center cursor-pointer ${
            mode === "Login"
              ? "border-b-2 border-indigo-500 font-bold text-indigo-600"
              : "text-gray-500"
          }`}
          onClick={() => setMode("Login")}
        >
          Login
        </button>
      </div>

      {/* Form Section */}
      <form className="p-6 flex flex-col space-y-4" onSubmit={handleSignIn}>
        {mode === "Register" && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-indigo-500 text-white font-semibold py-3 rounded-md hover:bg-indigo-600 transition-all duration-200 ${
            (!formData.email ||
              !formData.password ||
              (mode === "Register" && !formData.name)) &&
            "opacity-50 cursor-not-allowed"
          }`}
          disabled={
            !formData.email ||
            !formData.password ||
            (mode === "Register" && !formData.name)
          }
        >
          {mode}
        </button>
      </form>
    </div>
  );
};

export default SignIn;