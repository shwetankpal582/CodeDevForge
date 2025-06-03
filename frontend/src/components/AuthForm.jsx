import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm({ onSubmit, title, buttonText, isRegistration = false }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('developer');
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password, role });
    };

    const redirect = () => {
        if (isRegistration) {
            navigate("/login")
        } else {
            navigate("/register")
        }
    }

    return (
        <div className="w-[380px] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">{title}</h2>
                <p className="text-center text-gray-700 mb-8">
                    {isRegistration ? 'Create an account to get started' : 'Enter your credentials to continue'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-800 mb-2"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-800 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {isRegistration && (
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-800 mb-2"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="developer">Developer</option>
                                <option value="reviewer">Reviewer</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
                    >
                        {buttonText}
                    </button>
                </form>
                {isRegistration ? (
                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?
                        <button onClick={redirect} className="text-indigo-600 ml-1 underline">
                            Login
                        </button>
                    </p>
                ) : (
                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?
                        <button onClick={redirect} className="text-indigo-600 ml-1 underline">
                            Register
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}

export default AuthForm;
