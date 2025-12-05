"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";
import { supabase } from "@/lib/supabaseClient";
import { validatePasswordStrength } from "@/lib/passwordValidation";

function AuthContent() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get initial tab from URL or default to login
  const initialTab = searchParams.get("tab") || "login";
  const [activeTab, setActiveTab] = useState<"login" | "register">(
    initialTab === "register" ? "register" : "login"
  );

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState<"idle" | "logging" | "error">("idle");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    password: "",
    confirmPassword: "",
  });
  const [registerStatus, setRegisterStatus] = useState<"idle" | "registering" | "success" | "error">("idle");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  // Check for OAuth errors in URL
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setLoginStatus("error");
      if (error === "oauth_failed") {
        setLoginErrorMessage(t.auth.oauthError);
      } else if (error === "no_email") {
        setLoginErrorMessage("OAuth provider did not provide an email address.");
      } else {
        setLoginErrorMessage(t.auth.loginErrorGeneric);
      }
      // Clean up URL
      window.history.replaceState({}, "", "/auth");
    }
  }, [searchParams, t]);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push("/membership");
        }
      } catch (err) {
        // Not authenticated, stay on auth page
      }
    };
    checkAuth();
  }, [router]);

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus("logging");
    setLoginErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      setLoginStatus("error");
      setLoginErrorMessage(error.message || t.auth.loginErrorGeneric);
    } else {
      router.push("/membership");
    }
  };

  // Handle register form submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterStatus("registering");
    setRegisterErrorMessage("");

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterStatus("error");
      setRegisterErrorMessage(t.auth.passwordMismatch);
      return;
    }

    // Validate required fields
    if (!registerData.company || !registerData.company.trim()) {
      setRegisterStatus("error");
      setRegisterErrorMessage(t.auth.companyRequired || "Company is required");
      return;
    }

    if (!registerData.position || !registerData.position.trim()) {
      setRegisterStatus("error");
      setRegisterErrorMessage(t.auth.positionRequired || "Position is required");
      return;
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(registerData.password);
    if (!passwordValidation.isValid) {
      setRegisterStatus("error");
      setRegisterErrorMessage(passwordValidation.errors.join(". ") + ".");
      setPasswordStrength(passwordValidation.strength);
      setPasswordErrors(passwordValidation.errors);
      return;
    }

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          phone: registerData.phone,
          company: registerData.company,
          position: registerData.position,
          password: registerData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterStatus("error");
        setRegisterErrorMessage(data.error || t.auth.registerErrorGeneric);
        return;
      }

      setRegisterStatus("success");
      // Switch to login tab after successful registration
      setTimeout(() => {
        setActiveTab("login");
        setRegisterStatus("idle");
        setRegisterData({
          name: "",
          email: "",
          phone: "",
          company: "",
          position: "",
          password: "",
          confirmPassword: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterStatus("error");
      setRegisterErrorMessage(t.auth.registerErrorGeneric);
    }
  };

  // Handle OAuth login
  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoginStatus("logging");
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setLoginStatus("error");
      setLoginErrorMessage(t.auth.oauthError);
    }
  };

  // Handle password strength check on input
  const handlePasswordChange = (password: string) => {
    setRegisterData({ ...registerData, password });
    if (password.length > 0) {
      const validation = validatePasswordStrength(password);
      setPasswordStrength(validation.strength);
      setPasswordErrors(validation.errors);
    } else {
      setPasswordStrength(null);
      setPasswordErrors([]);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordStatus("sending");
    setForgotPasswordMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setForgotPasswordStatus("error");
      setForgotPasswordMessage(error.message || t.auth.resetPasswordError);
    } else {
      setForgotPasswordStatus("success");
      setForgotPasswordMessage(t.auth.resetPasswordSuccess);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md">
          <div className="bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "login"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {t.auth.tabLogin}
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "register"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {t.auth.tabRegister}
              </button>
            </div>

            <div className="p-8">
              {/* Login Tab */}
              {activeTab === "login" && (
                <>
                  <h1 className="text-3xl font-bold mb-2 text-slate-900 text-center">
                    {t.auth.loginTitle}
                  </h1>
                  <p className="text-sm text-slate-600 mb-8 text-center">
                    {t.auth.loginDescription}
                  </p>

                  {/* OAuth Login Buttons */}
                  <div className="space-y-3 mb-6">
                    <button
                      type="button"
                      onClick={() => handleOAuthLogin('google')}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-slate-300 text-slate-900 font-medium rounded-md hover:bg-slate-50 hover:border-slate-400 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {t.auth.loginWithGoogle}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOAuthLogin('github')}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                      </svg>
                      {t.auth.loginWithGitHub}
                    </button>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">{t.auth.or}</span>
                    </div>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.email}
                      </label>
                      <input
                        type="email"
                        id="login-email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="login-password" className="block text-sm font-semibold text-slate-900">
                          {t.auth.password}
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-slate-600 hover:text-slate-900 underline"
                        >
                          {t.auth.forgotPassword}
                        </button>
                      </div>
                      <input
                        type="password"
                        id="login-password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {loginStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                        {loginErrorMessage || t.auth.loginErrorGeneric}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loginStatus === "logging"}
                      className="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loginStatus === "logging" ? t.auth.logging : t.auth.loginButton}
                    </button>
                  </form>
                </>
              )}

              {/* Register Tab */}
              {activeTab === "register" && (
                <>
                  <h1 className="text-3xl font-bold mb-2 text-slate-900 text-center">
                    {t.auth.registerTitle}
                  </h1>
                  <p className="text-sm text-slate-600 mb-8 text-center">
                    {t.auth.registerDescription}
                  </p>

                  {/* OAuth Registration Buttons */}
                  <div className="space-y-3 mb-6">
                    <button
                      type="button"
                      onClick={() => handleOAuthLogin('google')}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-slate-300 text-slate-900 font-medium rounded-md hover:bg-slate-50 hover:border-slate-400 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {t.auth.loginWithGoogle}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOAuthLogin('github')}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                      </svg>
                      {t.auth.loginWithGitHub}
                    </button>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">{t.auth.or}</span>
                    </div>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="register-name" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.name}
                      </label>
                      <input
                        type="text"
                        id="register-name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="register-email" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.email}
                      </label>
                      <input
                        type="email"
                        id="register-email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="register-phone" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.phone} <span className="text-slate-500 text-xs font-normal">({t.auth.optional})</span>
                      </label>
                      <input
                        type="tel"
                        id="register-phone"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        placeholder={t.auth.phonePlaceholder}
                      />
                    </div>

                    <div>
                      <label htmlFor="register-company" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.company} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="register-company"
                        value={registerData.company}
                        onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        placeholder={t.auth.companyPlaceholder}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="register-position" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.position} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="register-position"
                        value={registerData.position}
                        onChange={(e) => setRegisterData({ ...registerData, position: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        placeholder={t.auth.positionPlaceholder}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="register-password" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.password}
                      </label>
                      <input
                        type="password"
                        id="register-password"
                        value={registerData.password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className={`w-full px-4 py-2.5 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400 ${
                          passwordStrength === 'strong' ? 'border-green-300' :
                          passwordStrength === 'medium' ? 'border-yellow-300' :
                          passwordStrength === 'weak' && registerData.password.length > 0 ? 'border-red-300' :
                          'border-slate-300'
                        }`}
                        required
                        minLength={8}
                      />
                      <p className="text-xs text-slate-600 mt-1">{t.auth.passwordHint}</p>
                      {passwordStrength && registerData.password.length > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`h-2 flex-1 rounded ${
                              passwordStrength === 'strong' ? 'bg-green-500' :
                              passwordStrength === 'medium' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}></div>
                            <span className={`text-xs font-medium ${
                              passwordStrength === 'strong' ? 'text-green-700' :
                              passwordStrength === 'medium' ? 'text-yellow-700' :
                              'text-red-700'
                            }`}>
                              {passwordStrength === 'strong' ? 'Strong' :
                               passwordStrength === 'medium' ? 'Medium' :
                               'Weak'}
                            </span>
                          </div>
                          {passwordErrors.length > 0 && (
                            <ul className="text-xs text-red-600 mt-1 list-disc list-inside">
                              {passwordErrors.slice(0, 3).map((error, idx) => (
                                <li key={idx}>{error}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="register-confirm-password" className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.auth.confirmPassword}
                      </label>
                      <input
                        type="password"
                        id="register-confirm-password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                        required
                        minLength={8}
                      />
                    </div>

                    {registerStatus === "success" && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                        {t.auth.registerSuccess}
                      </div>
                    )}

                    {registerStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                        {registerErrorMessage || t.auth.registerErrorGeneric}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={registerStatus === "registering"}
                      className="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {registerStatus === "registering" ? t.auth.registering : t.auth.registerButton}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">{t.auth.resetPassword}</h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordEmail("");
                  setForgotPasswordStatus("idle");
                  setForgotPasswordMessage("");
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">{t.auth.resetPasswordDescription}</p>
            
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-semibold text-slate-900 mb-2">
                  {t.auth.email}
                </label>
                <input
                  type="email"
                  id="forgot-email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>

              {forgotPasswordStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                  {forgotPasswordMessage}
                </div>
              )}

              {forgotPasswordStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {forgotPasswordMessage}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordEmail("");
                    setForgotPasswordStatus("idle");
                    setForgotPasswordMessage("");
                  }}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                >
                  {t.auth.backToLogin}
                </button>
                <button
                  type="submit"
                  disabled={forgotPasswordStatus === "sending" || forgotPasswordStatus === "success"}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {forgotPasswordStatus === "sending" ? t.auth.resetPasswordSending : t.auth.resetPasswordButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white">
        <Navbar />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-md">
            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-8 text-center">
              <p className="text-slate-600">Loading...</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    }>
      <AuthContent />
    </Suspense>
  );
}

