import React, { useState } from "react";
import { registerUser } from "../services/api";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"reader" | "creator">("reader");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser({ username, email, password, role });
      console.log("Registered:", data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-2xl mb-4">Register</h2>
      <div className="mb-4">
        <label className="block mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "reader" | "creator")}
          className="border p-2 w-full"
        >
          <option value="reader">Reader</option>
          <option value="creator">Creator</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Register
      </button>
    </form>
  );
};