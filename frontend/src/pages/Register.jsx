import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { backendURL } from "../utils/backendUrl";

function Register() {
  const navigate = useNavigate();
  const { updateAlertBox } = useAuth();

  const handleRegister = async (formData) => {
    try {
      console.log("Attempting registration with:", {
        username: formData.username,
        role: formData.role,
      });
      console.log("Backend URL:", backendURL);

      const response = await fetch(`${backendURL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Registration response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        updateAlertBox("User Registered Successfully", "success");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        updateAlertBox(
          `Registration failed: ${errorData.message || "Unknown error"}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      updateAlertBox(`Registration failed: ${error.message}`, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <nav className="fixed top-0 left-0 w-full  text-black z-10 text-xl font-bold p-4">
        <a href="/">CodeDevForge</a>
      </nav>
      <AuthForm
        onSubmit={handleRegister}
        isRegistration
        title="Register"
        buttonText="Register"
      />
    </div>
  );
}

export default Register;
