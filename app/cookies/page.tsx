/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Next Hardware",
  description: "Cookie Policy for Next Hardware community website",
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        
        <div className="border border-slate-200 rounded-lg p-8 lg:p-12 space-y-8 text-slate-600 bg-white">
          <div>
            <p className="text-sm text-slate-500 font-mono mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-slate-600 mb-4">
              This Cookie Policy explains how Next Hardware ("we," "us," or "our") uses cookies and similar tracking technologies on our website nexthardware.io (the "Website").
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">1. What Are Cookies?</h2>
            <p className="mb-4 leading-relaxed">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="mb-4 leading-relaxed">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.
            </p>
            <p className="mb-4 leading-relaxed">
              We may also use other tracking technologies similar to cookies, such as web beacons, pixel tags, and local storage, which function similarly to cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">2. Our Current Cookie Usage</h2>
            <p className="mb-4 leading-relaxed">
              <strong>Currently, Next Hardware does not use cookies or similar tracking technologies on our Website.</strong> We use privacy-focused analytics tools (such as Plausible Analytics) that do not require cookies and do not collect personal information or track users across websites.
            </p>
            <p className="mb-4 leading-relaxed">
              Our analytics tools provide us with aggregated, anonymized data about website usage without using cookies or collecting personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">3. Types of Cookies We May Use in the Future</h2>
            <p className="mb-4 leading-relaxed">
              If we implement cookies in the future, we will update this Cookie Policy and provide clear notice. We may use the following types of cookies:
            </p>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">3.1 Essential Cookies</h3>
            <p className="mb-4 leading-relaxed">
              These cookies are strictly necessary for the Website to function properly. They enable core functionality such as security, network management, accessibility, and basic features. These cookies cannot be disabled in our systems as they are essential for the Website to work.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Legal Basis:</strong> Legitimate interest in providing a functional website.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">3.2 Analytics Cookies</h3>
            <p className="mb-4 leading-relaxed">
              These cookies help us understand how visitors interact with our Website by collecting and reporting information anonymously. This information helps us improve our Website and user experience.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Legal Basis:</strong> Your consent (where required by law).
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">3.3 Functional Cookies</h3>
            <p className="mb-4 leading-relaxed">
              These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and login information.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Legal Basis:</strong> Your consent (where required by law).
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">3.4 Advertising Cookies</h3>
            <p className="mb-4 leading-relaxed">
              These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Note:</strong> We currently do not use advertising cookies and have no plans to implement them. If this changes, we will update this policy and provide opt-out mechanisms.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Legal Basis:</strong> Your consent (required by law).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">4. Third-Party Cookies</h2>
            <p className="mb-4 leading-relaxed">
              Some third-party services that we integrate with may set their own cookies. These include:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Luma:</strong> For event registration and community management. Luma may use cookies to manage your event registrations and preferences. Please review Luma's privacy policy and cookie policy for more information.</li>
              <li><strong>Discord:</strong> For community communication. If you access our Discord server through our Website, Discord may use cookies. Please review Discord's privacy policy and cookie policy.</li>
              <li><strong>Social Media Platforms:</strong> If we embed social media content (such as Twitter feeds), those platforms may set cookies. We do not control these cookies.</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We do not control third-party cookies. These cookies are subject to the respective privacy policies and cookie policies of these third parties. We encourage you to review their policies to understand how they use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">5. Managing Cookies</h2>
            <p className="mb-4 leading-relaxed">
              You have several options for managing cookies:
            </p>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">5.1 Browser Settings</h3>
            <p className="mb-4 leading-relaxed">
              Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies, delete cookies, or alert you when cookies are being sent. However, if you disable cookies, some features of our Website may not function properly.
            </p>
            <p className="mb-4 leading-relaxed">
              Instructions for managing cookies in popular browsers:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
            </ul>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">5.2 Browser Extensions</h3>
            <p className="mb-4 leading-relaxed">
              You can use browser extensions and add-ons to block or manage cookies. Popular options include privacy-focused extensions that block tracking cookies.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">5.3 Opt-Out Tools</h3>
            <p className="mb-4 leading-relaxed">
              For advertising cookies, you can use industry opt-out tools such as:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Digital Advertising Alliance (DAA) opt-out page</li>
              <li>Network Advertising Initiative (NAI) opt-out page</li>
              <li>Your Online Choices (for EU users)</li>
            </ul>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">5.4 Cookie Consent</h3>
            <p className="mb-4 leading-relaxed">
              If we implement cookies that require consent, we will provide a cookie consent banner or mechanism that allows you to accept or reject non-essential cookies. You can change your preferences at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">6. Do Not Track Signals</h2>
            <p className="mb-4 leading-relaxed">
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no industry standard for how to respond to DNT signals. We do not currently respond to DNT browser signals. If we implement tracking in the future, we will update this policy to explain how we respond to DNT signals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">7. California-Specific Information</h2>
            <p className="mb-4 leading-relaxed">
              Under the California Consumer Privacy Act (CCPA), California residents have the right to know about cookies and tracking technologies used on websites. As stated above, we currently do not use cookies. If we implement cookies in the future, we will:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Disclose the categories of cookies used</li>
              <li>Explain the purpose of each category</li>
              <li>Provide mechanisms for opting out of non-essential cookies</li>
              <li>Update our Privacy Policy with cookie-related disclosures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">8. European Union (GDPR) Information</h2>
            <p className="mb-4 leading-relaxed">
              Under the General Data Protection Regulation (GDPR), we are required to obtain your consent before using non-essential cookies. Currently, we do not use cookies that require consent. If we implement such cookies in the future, we will:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Obtain your explicit consent before placing non-essential cookies</li>
              <li>Provide clear information about the types of cookies used</li>
              <li>Allow you to withdraw consent at any time</li>
              <li>Provide granular control over different types of cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">9. Updates to This Cookie Policy</h2>
            <p className="mb-4 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Posting the updated Cookie Policy on this page with a new "Last Updated" date</li>
              <li>Displaying a prominent notice on our Website (for significant changes)</li>
              <li>Sending an email notification to registered users (for material changes)</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              Your continued use of our Website after such changes constitutes your acceptance of the updated Cookie Policy. We encourage you to review this Cookie Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">10. Contact Us</h2>
            <p className="mb-4 leading-relaxed">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm border border-slate-200">
              <p className="mb-2 text-slate-900"><strong>Next Hardware</strong></p>
              <p className="mb-2 text-slate-600"><strong>Email:</strong> privacy@nexthardware.io</p>
              <p className="mb-2 text-slate-600"><strong>Website:</strong> nexthardware.io</p>
              <p className="mb-2 text-slate-600"><strong>Address:</strong> [Your California Business Address]</p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">Legal Notice</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                This Cookie Policy is designed to comply with applicable laws including CCPA, GDPR, ePrivacy Directive, and other relevant regulations. Cookie laws vary by jurisdiction and may change. This policy should be reviewed by a qualified attorney familiar with privacy and data protection law before publication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
