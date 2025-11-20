/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Next Hardware",
  description: "Privacy Policy for Next Hardware community website",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="border border-slate-200 rounded-lg p-8 lg:p-12 space-y-8 text-slate-600 bg-white">
          <div>
            <p className="text-sm text-slate-500 font-mono mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-slate-600 mb-4">
              This Privacy Policy describes how Next Hardware ("we," "our," or "us") collects, uses, and shares information about you when you use our website nexthardware.io (the "Website") and related services.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">1. Introduction and Scope</h2>
            <p className="mb-4 leading-relaxed">
              Next Hardware is committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of information that we receive through our Website and related services, including but not limited to community events, forums, and communications.
            </p>
            <p className="mb-4 leading-relaxed">
              This Privacy Policy complies with applicable privacy laws, including the California Online Privacy Protection Act (CalOPPA), the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), the General Data Protection Regulation (GDPR) where applicable, and other relevant privacy regulations.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>CalOPPA Compliance:</strong> In accordance with the California Online Privacy Protection Act, this policy discloses: (1) the categories of personally identifiable information we collect; (2) how we use such information; (3) the categories of third parties with whom we share such information; and (4) how you can review and request changes to your information.
            </p>
            <p className="mb-4 leading-relaxed">
              By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">2. Information We Collect</h2>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">2.1 Information You Provide Directly</h3>
            <p className="mb-4 leading-relaxed">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Account Information:</strong> Name, email address, username, and password when you create an account or join our community through third-party platforms (Luma, Discord)</li>
              <li><strong>Event Registration:</strong> Information provided when registering for events, including name, email, company affiliation, and dietary preferences or accessibility needs</li>
              <li><strong>Communications:</strong> Information you provide when contacting us, including email correspondence, support requests, and feedback</li>
              <li><strong>Community Content:</strong> Posts, comments, project submissions, photos, and other content you share in community forums or events</li>
              <li><strong>Profile Information:</strong> Optional profile information such as bio, location, professional background, and interests</li>
            </ul>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">2.2 Information Collected Automatically</h3>
            <p className="mb-4 leading-relaxed">
              When you visit our Website, we automatically collect certain information about your device and how you interact with our Website, including:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Device Information:</strong> IP address, browser type and version, operating system, device identifiers, and mobile network information</li>
              <li><strong>Usage Information:</strong> Pages visited, time spent on pages, clickstream data, search queries, and navigation patterns</li>
              <li><strong>Location Information:</strong> General geographic location derived from IP address (city and state level, not precise location)</li>
              <li><strong>Technical Information:</strong> Browser language, screen resolution, time zone, and referring website addresses</li>
            </ul>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">2.3 Information from Third Parties</h3>
            <p className="mb-4 leading-relaxed">
              We may receive information about you from third-party services that you use to access our Website, including:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Social Media Platforms:</strong> If you connect your social media accounts, we may receive profile information</li>
              <li><strong>Event Platforms:</strong> Information from Luma or other event management platforms when you register for events</li>
              <li><strong>Community Platforms:</strong> Information from Discord or other community platforms when you join our community</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">3. How We Use Your Information</h2>
            <p className="mb-4 leading-relaxed">We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Service Provision:</strong> To provide, maintain, and improve our Website and services, including event management and community features</li>
              <li><strong>Communication:</strong> To send you updates about events, community activities, newsletters (with your consent), and respond to your inquiries</li>
              <li><strong>Community Management:</strong> To facilitate community interactions, moderate content, and ensure a safe environment</li>
              <li><strong>Analytics:</strong> To analyze usage patterns, understand user preferences, and improve user experience</li>
              <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, security issues, and technical problems</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations, enforce our Terms of Service, and protect our rights and the rights of our users</li>
              <li><strong>Business Operations:</strong> To manage our business operations, including event planning, community growth, and service development</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">4. How We Share Your Information</h2>
            <p className="mb-4 leading-relaxed">We do not sell your personal information. We may share your information in the following circumstances:</p>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">4.1 With Your Consent</h3>
            <p className="mb-4 leading-relaxed">
              We may share your information when you have given us explicit consent to do so.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">4.2 Service Providers</h3>
            <p className="mb-4 leading-relaxed">
              We may share information with third-party service providers who perform services on our behalf, including hosting, analytics, email delivery, and event management. These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">4.3 Legal Requirements</h3>
            <p className="mb-4 leading-relaxed">
              We may disclose information if required by law, court order, or governmental regulation, or if we believe disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or comply with a legal process.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">4.4 Business Transfers</h3>
            <p className="mb-4 leading-relaxed">
              In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">4.5 Public Information</h3>
            <p className="mb-4 leading-relaxed">
              Information you choose to make public in community forums, event listings, or public profiles will be visible to other users and the general public.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">5. Analytics and Tracking Technologies</h2>
            <p className="mb-4 leading-relaxed">
              We use privacy-focused analytics tools (such as Plausible Analytics) that comply with GDPR, CCPA, and PECR. These tools provide aggregated, anonymized data about website usage without collecting personal information or using cookies for tracking purposes.
            </p>
            <p className="mb-4 leading-relaxed">
              Currently, we do not use cookies, web beacons, or similar tracking technologies. If we implement such technologies in the future, we will update this Privacy Policy and our Cookie Policy, and provide clear notice and opt-out mechanisms where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">6. Data Security</h2>
            <p className="mb-4 leading-relaxed">
              We implement reasonable technical, administrative, and physical security measures designed to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Secure Socket Layer (SSL) / Transport Layer Security (TLS) encryption for data transmission</li>
              <li>Encryption of data at rest where appropriate</li>
              <li>Secure servers and hosting infrastructure</li>
              <li>Access controls and authentication measures</li>
              <li>Regular security assessments and updates</li>
              <li>Employee training on data security practices</li>
              <li>Incident response procedures</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially reasonable means to protect your information, we cannot guarantee absolute security. You use our Website at your own risk.
            </p>
            <p className="mb-4 leading-relaxed">
              If we become aware of a security breach that may affect your personal information, we will notify you and relevant authorities as required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">7. Your Rights and Choices</h2>
            <p className="mb-4 leading-relaxed">Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to and copies of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to certain exceptions</li>
              <li><strong>Portability:</strong> Request transfer of your information to another service (where applicable)</li>
              <li><strong>Opt-Out:</strong> Opt-out of certain data collection and processing activities</li>
              <li><strong>Objection:</strong> Object to processing of your information for certain purposes (where applicable)</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances (where applicable)</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within the timeframes required by applicable law (typically 30-45 days).
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>How to Review and Request Changes to Your Information (CalOPPA Requirement):</strong> You may review and request changes to your personal information by:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Emailing us at privacy@nexthardware.io with your request</li>
              <li>Specifying what information you wish to review or change</li>
              <li>Providing sufficient information to verify your identity</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We will respond to your request within a reasonable timeframe and will make reasonable efforts to accommodate your request, subject to legal and operational constraints.
            </p>
            <p className="mb-4 leading-relaxed">
              We may require verification of your identity before processing certain requests to protect your privacy and security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">7.1 California Consumer Privacy Act (CCPA) Rights</h2>
            <p className="mb-4 leading-relaxed">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA):
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Right to Know:</strong> You have the right to request that we disclose: (1) the categories of personal information we collect; (2) the categories of sources from which we collect personal information; (3) the business or commercial purpose for collecting or selling personal information; (4) the categories of third parties with whom we share personal information; and (5) the specific pieces of personal information we have collected about you.</li>
              <li><strong>Right to Delete:</strong> You have the right to request that we delete your personal information that we have collected, subject to certain exceptions under California law.</li>
              <li><strong>Right to Opt-Out of Sale:</strong> You have the right to opt-out of the sale of your personal information. <strong>We do not sell personal information.</strong> If this changes in the future, we will update this policy and provide a clear "Do Not Sell My Personal Information" link.</li>
              <li><strong>Right to Opt-Out of Sharing:</strong> You have the right to opt-out of the sharing of your personal information for cross-context behavioral advertising.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights, including by denying services, charging different prices, or providing a different level of service.</li>
              <li><strong>Right to Correct:</strong> You have the right to request correction of inaccurate personal information.</li>
              <li><strong>Right to Limit Use of Sensitive Information:</strong> You have the right to limit our use of sensitive personal information to that which is necessary for providing services.</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              <strong>Categories of Personal Information We Collect:</strong> We may collect the following categories of personal information as defined by the CCPA:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Identifiers (name, email address, IP address, device identifiers)</li>
              <li>Internet or electronic network activity (browsing history, search history, interaction with website)</li>
              <li>Geolocation data (general location derived from IP address)</li>
              <li>Professional or employment-related information (if provided in profile or event registration)</li>
              <li>Inferences drawn from other information to create a profile about preferences</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              <strong>Categories of Personal Information We Disclose:</strong> We may disclose the categories listed above to service providers and as described in Section 4. We do not sell personal information to third parties.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Business or Commercial Purpose for Collection:</strong> We collect personal information for the following business or commercial purposes: (1) providing and improving our Services; (2) processing event registrations and community memberships; (3) communicating with users; (4) ensuring security and preventing fraud; (5) complying with legal obligations; and (6) other purposes described in Section 3.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Categories of Sources:</strong> We collect personal information from: (1) you directly (when you provide it to us); (2) automatically when you use our Website; and (3) third-party services (such as Luma, Discord) when you use those services to access our community.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Do Not Sell My Personal Information:</strong> We do not sell personal information. If this changes in the future, we will update this policy and provide a clear "Do Not Sell My Personal Information" link on our website homepage.
            </p>
            <p className="mb-4 leading-relaxed">
              To exercise your CCPA rights, please contact us using the information provided in the "Contact Us" section below. Please include "CCPA Request" in the subject line and specify which right(s) you wish to exercise. We will respond within 45 days as required by California law.
            </p>
            <p className="mb-4 leading-relaxed">
              You may designate an authorized agent to make requests on your behalf. We will require verification of your identity and the agent's authorization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">8. Data Retention</h2>
            <p className="mb-4 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
            <p className="mb-4 leading-relaxed">
              Factors that determine retention periods include: the nature of the information, the purpose for which it was collected, legal and regulatory requirements, and our legitimate business interests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">9. Children's Privacy</h2>
            <p className="mb-4 leading-relaxed">
              Our Website is not intended for children under 13 years of age (or under 16 in the European Economic Area). We do not knowingly collect personal information from children under 13 (or 16 in the EEA). If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from a child under 13 (or 16 in the EEA), we will take steps to delete such information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">10. International Data Transfers</h2>
            <p className="mb-4 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our Website, you consent to the transfer of your information to these countries.
            </p>
            <p className="mb-4 leading-relaxed">
              When we transfer information from the European Economic Area, we ensure appropriate safeguards are in place, such as standard contractual clauses approved by the European Commission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">11. Third-Party Links and Services</h2>
            <p className="mb-4 leading-relaxed">
              Our Website may contain links to third-party websites, services, or applications that are not operated by us. These third parties include:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li><strong>Luma:</strong> For event registration and community management</li>
              <li><strong>Discord:</strong> For community communication and forums</li>
              <li><strong>Social Media Platforms:</strong> Twitter/X, GitHub, and other platforms</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information to them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">12. Changes to This Privacy Policy</h2>
            <p className="mb-4 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Posting the updated Privacy Policy on this page with a new "Last Updated" date</li>
              <li>Sending an email notification to registered users (for material changes)</li>
              <li>Displaying a prominent notice on our Website (for significant changes)</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              Your continued use of our Website after such changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">13. Contact Us</h2>
            <p className="mb-4 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm border border-slate-200">
              <p className="mb-2 text-slate-900"><strong>Next Hardware</strong></p>
              <p className="mb-2 text-slate-600"><strong>Email:</strong> privacy@nexthardware.io</p>
              <p className="mb-2 text-slate-600"><strong>Website:</strong> nexthardware.io</p>
              <p className="mb-2 text-slate-600"><strong>Address:</strong> [Your California Business Address - Required for CCPA compliance]</p>
              <p className="mt-4 text-xs text-slate-500">
                <strong>For CCPA Requests:</strong> Please email privacy@nexthardware.io with "CCPA Request" in the subject line and specify which right you wish to exercise (access, deletion, correction, etc.). Include your full name and email address for verification.
              </p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">Legal Notice</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                This Privacy Policy is designed to comply with applicable privacy laws including CalOPPA, CCPA/CPRA, GDPR, and other relevant regulations. However, privacy laws are complex and may change. This policy should be reviewed by a qualified attorney familiar with privacy law before publication. You are responsible for ensuring compliance with all applicable laws based on your specific circumstances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
