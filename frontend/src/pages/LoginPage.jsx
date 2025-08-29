import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { backendURL } from "../utils/backendUrl";

function LoginPage() {
  const { login, updateAlertBox } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      console.log("Attempting login for user:", formData.username);
      console.log("Backend URL:", backendURL);

      const response = await fetch(`${backendURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Login response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        login(data.token, data.user);
        navigate("/");
        updateAlertBox("Login successful", "success");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        updateAlertBox(
          `Login failed: ${errorData.message || "Unknown error"}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      updateAlertBox(`Login failed: ${error.message}`, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <nav className="fixed top-0 left-0 w-full  text-black z-10 text-xl font-bold p-4">
        <a href="/">CodeDevForge</a>
      </nav>

      <AuthForm onSubmit={handleLogin} title="Login" buttonText="Login" />
    </div>
  );
}

export default LoginPage;
