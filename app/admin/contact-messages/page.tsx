"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read: boolean;
}

export default function AdminContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  // Check for authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/contact-messages", {
          credentials: "include", // Important: Include cookies
        });
        if (response.ok) {
          setAuthenticated(true);
          fetchMessages();
        } else if (response.status === 401) {
          // Not authenticated, redirect to login
          window.location.href = "/admin/subscribers";
        }
      } catch (err) {
        // Not authenticated
        window.location.href = "/admin/subscribers";
      }
    };
    checkAuth();
  }, []);

  // Auto-refresh messages every 30 seconds when authenticated
  useEffect(() => {
    if (!authenticated) return;

    const interval = setInterval(() => {
      fetchMessages();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [authenticated]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/contact-messages", {
        credentials: "include", // Important: Include cookies for authentication
      });
      if (!response.ok) {
        if (response.status === 401) {
          setAuthenticated(false);
          window.location.href = "/admin/subscribers";
          return;
        }
        throw new Error("Failed to fetch contact messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: number, currentRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ read: !currentRead }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, read: !currentRead } : msg
        )
      );

      // Update selected message if it's the one being toggled
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) =>
          prev ? { ...prev, read: !currentRead } : null
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update message");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      // Remove from local state
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      
      // Clear selected if it was deleted
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message");
    }
  };

  const unreadCount = messages.filter((msg) => !msg.read).length;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <p className="text-slate-600 text-center">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
              <p className="text-slate-600 mt-1">
                Total: {messages.length} messages
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">
                    {unreadCount} unread
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/subscribers"
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm"
              >
                Subscribers
              </Link>
              <button
                onClick={fetchMessages}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm"
              >
                Refresh
              </button>
              <button
                onClick={async () => {
                  try {
                    await fetch("/api/admin/auth", {
                      method: "DELETE",
                      credentials: "include", // Include cookies
                    });
                  } catch (err) {
                    console.error("Logout error:", err);
                  }
                  window.location.href = "/admin/subscribers";
                }}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-slate-600">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600">No contact messages yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        message.read
                          ? "border-slate-200 bg-white hover:border-slate-300"
                          : "border-slate-300 bg-slate-50 hover:border-slate-400"
                      } ${
                        selectedMessage?.id === message.id
                          ? "ring-2 ring-slate-500"
                          : ""
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900">
                              {message.name}
                            </h3>
                            {!message.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-1">
                            {message.email}
                          </p>
                          {message.subject && (
                            <p className="text-sm font-medium text-slate-700 mb-1">
                              {message.subject}
                            </p>
                          )}
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {message.message}
                          </p>
                          <p className="text-xs text-slate-500 mt-2">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRead(message.id, message.read);
                            }}
                            className={`px-3 py-1 text-xs rounded ${
                              message.read
                                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                            title={message.read ? "Mark as unread" : "Mark as read"}
                          >
                            {message.read ? "Unread" : "Read"}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(message.id);
                            }}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-1">
              {selectedMessage ? (
                <div className="border border-slate-200 rounded-lg p-6 bg-white sticky top-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Message Details
                    </h2>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Name
                      </label>
                      <p className="text-slate-900 mt-1">{selectedMessage.name}</p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Email
                      </label>
                      <p className="text-slate-900 mt-1">
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {selectedMessage.email}
                        </a>
                      </p>
                    </div>

                    {selectedMessage.subject && (
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Subject
                        </label>
                        <p className="text-slate-900 mt-1">{selectedMessage.subject}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Message
                      </label>
                      <p className="text-slate-900 mt-1 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Received
                      </label>
                      <p className="text-slate-600 mt-1 text-sm">
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex gap-2">
                      <button
                        onClick={() => toggleRead(selectedMessage.id, selectedMessage.read)}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                          selectedMessage.read
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {selectedMessage.read ? "Mark as Unread" : "Mark as Read"}
                      </button>
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 text-center">
                  <p className="text-slate-500 text-sm">
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

