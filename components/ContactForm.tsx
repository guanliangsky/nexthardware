"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      // Get Formspree endpoint from environment or use default
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
      
      // Option 1: Use Formspree (sends email notification)
      if (formspreeEndpoint) {
        const formspreeResponse = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || "Contact Form Submission",
            message: formData.message,
            _replyto: formData.email, // So you can reply directly
          }),
        });

        if (!formspreeResponse.ok) {
          throw new Error("Formspree submission failed");
        }
      }

      // Option 2: Also save to database (if Formspree succeeded or if no Formspree)
      try {
        const dbResponse = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!dbResponse.ok) {
          // If Formspree worked but DB failed, that's okay - we still got the email
          if (formspreeEndpoint) {
            console.warn("Formspree succeeded but database save failed");
          } else {
            throw new Error("Database save failed");
          }
        }
      } catch (dbError) {
        // If Formspree worked, we're good even if DB fails
        if (!formspreeEndpoint) {
          throw dbError;
        }
        console.warn("Database save failed but Formspree succeeded:", dbError);
      }

      setStatus("success");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setStatus("idle");
      }, 3000);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={6}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900 resize-none"
          required
        />
      </div>

      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
          ✓ Your message has been sent successfully! We&apos;ll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

