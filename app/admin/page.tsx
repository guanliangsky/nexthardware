"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/subscribers", {
          credentials: "include",
        });
        if (response.ok) {
          // Already authenticated, redirect to subscribers page
          router.push("/admin/subscribers");
        }
      } catch (err) {
        // Not authenticated, stay on login page
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Incorrect password");
        setLoading(false);
        return;
      }

      if (data.success) {
        // Redirect to subscribers page after successful login
        router.push("/admin/subscribers");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-slate-900">Admin Access</h1>
        <p className="text-sm text-slate-600 mb-6">Enter your password to access the admin dashboard</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
              placeholder="Enter admin password"
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            Access subscriber and contact message management
          </p>
        </div>
      </div>
    </div>
  );
}


