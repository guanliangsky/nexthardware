// Test if environment variables are accessible
console.log("Testing environment variables...");
console.log("RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
console.log("RESEND_API_KEY length:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0);
console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL || "NOT SET");
