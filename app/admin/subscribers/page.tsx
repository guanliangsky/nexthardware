"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Check for authentication on mount (verify with server)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verify session with server using cookies
        // The cookie is automatically sent with the request
        const response = await fetch("/api/admin/subscribers", {
          credentials: "include", // Important: Include cookies
        });
        if (response.ok) {
          setAuthenticated(true);
          fetchSubscribers();
        } else {
          // Session invalid, clear any client-side state
          localStorage.removeItem("admin_authenticated");
          setAuthenticated(false);
        }
      } catch (err) {
        // Not authenticated
        localStorage.removeItem("admin_authenticated");
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Auto-refresh subscribers every 10 seconds when authenticated
  useEffect(() => {
    if (!authenticated) return;

    const interval = setInterval(() => {
      fetchSubscribers();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important: Include cookies
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Incorrect password");
        return;
      }

      if (data.success) {
        setAuthenticated(true);
        // Session is stored in HTTP-only cookie by server
        // No need for localStorage (cookie is more secure)
        fetchSubscribers();
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      // Clear server-side session cookie
      await fetch("/api/admin/auth", {
        method: "DELETE",
        credentials: "include", // Include cookies
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    // Clear client-side state
    setAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Include credentials to send cookies
      const response = await fetch("/api/admin/subscribers", {
        credentials: "include", // Important: Include cookies for authentication
      });
      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized - session expired
          setAuthenticated(false);
          localStorage.removeItem("admin_authenticated");
          throw new Error("Session expired. Please login again.");
        }
        throw new Error("Failed to fetch subscribers");
      }

      const data = await response.json();
      setSubscribers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/subscribers/${id}`, {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }

      // Refresh the list
      fetchSubscribers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete subscriber");
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Email", "Subscribed At"];
    const rows = subscribers.map((s) => [
      s.id,
      s.email,
      new Date(s.subscribed_at).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-slate-900">Admin Access</h1>
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
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Newsletter Subscribers</h1>
              <p className="text-slate-600 mt-1">Total: {subscribers.length} subscribers</p>
            </div>
                 <div className="flex gap-3">
                     <a
                       href="/admin/contact-messages"
                       className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm"
                     >
                       Contact Messages
                     </a>
                     <button
                       onClick={fetchSubscribers}
                       className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm"
                     >
                       Refresh
                     </button>
                     <button
                       onClick={exportCSV}
                       className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm"
                     >
                       Export CSV
                     </button>
                     <button
                       onClick={handleLogout}
                       className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                     >
                       Logout
                     </button>
                   </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading subscribers...</p>
            </div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No subscribers yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Subscribed At</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm text-slate-900">{subscriber.id}</td>
                      <td className="py-3 px-4 text-sm text-slate-900">{subscriber.email}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {new Date(subscriber.subscribed_at).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

