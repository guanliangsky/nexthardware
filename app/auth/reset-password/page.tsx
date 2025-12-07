"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";
import { supabase } from "@/lib/supabaseClient";
import { validatePasswordStrength } from "@/lib/passwordValidation";

function ResetPasswordContent() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "resetting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  useEffect(() => {
    // Check if user has a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth?error=invalid_reset_link");
      }
    };
    checkSession();
  }, [router]);

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    if (newPassword.length > 0) {
      const validation = validatePasswordStrength(newPassword);
      setPasswordStrength(validation.strength);
      setPasswordErrors(validation.errors);
    } else {
      setPasswordStrength(null);
      setPasswordErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("resetting");
    setErrorMessage("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage(t.auth.passwordMismatch);
      return;
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      setStatus("error");
      setErrorMessage(passwordValidation.errors.join(". ") + ".");
      setPasswordStrength(passwordValidation.strength);
      setPasswordErrors(passwordValidation.errors);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setStatus("error");
        setErrorMessage(error.message || "Failed to reset password. Please try again.");
      } else {
        setStatus("success");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md">
          <div className="bg-white border border-slate-200 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 text-center">
              Reset Password
            </h1>
            <p className="text-sm text-slate-600 mb-8 text-center">
              Enter your new password below
            </p>

            {status === "success" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm mb-6">
                Password reset successful! Redirecting to login...
              </div>
            )}

            {status === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm mb-6">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-semibold text-slate-900 mb-2">
                  {t.auth.password}
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400 ${
                    passwordStrength === 'strong' ? 'border-green-300' :
                    passwordStrength === 'medium' ? 'border-yellow-300' :
                    passwordStrength === 'weak' && password.length > 0 ? 'border-red-300' :
                    'border-slate-300'
                  }`}
                  required
                  minLength={8}
                />
                <p className="text-xs text-slate-600 mt-1">{t.auth.passwordHint}</p>
                {passwordStrength && password.length > 0 && (
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
                <label htmlFor="confirm-new-password" className="block text-sm font-semibold text-slate-900 mb-2">
                  {t.auth.confirmPassword}
                </label>
                <input
                  type="password"
                  id="confirm-new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                disabled={status === "resetting" || status === "success"}
                className="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "resetting" ? "Resetting..." : status === "success" ? "Success!" : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ResetPasswordPage() {
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
      <ResetPasswordContent />
    </Suspense>
  );
}


