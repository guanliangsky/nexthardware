/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Next Hardware",
  description: "Terms of Service for Next Hardware community website",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        
        <div className="border border-slate-200 rounded-lg p-8 lg:p-12 space-y-8 text-slate-600 bg-white">
          <div>
            <p className="text-sm text-slate-500 font-mono mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-slate-600 mb-4">
              These Terms of Service ("Terms") govern your access to and use of the Next Hardware website located at nexthardware.io (the "Website") and related services (collectively, the "Services") operated by Next Hardware ("we," "us," or "our").
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">1. Agreement to Terms</h2>
            <p className="mb-4 leading-relaxed">
              By accessing or using our Website or Services, you agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you may not access or use our Website or Services.
            </p>
            <p className="mb-4 leading-relaxed">
              These Terms constitute a legally binding agreement between you and Next Hardware. You represent that you are at least 18 years of age (or the age of majority in your jurisdiction) and have the legal capacity to enter into this agreement.
            </p>
            <p className="mb-4 leading-relaxed">
              We reserve the right to modify these Terms at any time. Material changes will be notified by posting the updated Terms on this page with a new "Last Updated" date. Your continued use of our Services after such changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">2. Description of Services</h2>
            <p className="mb-4 leading-relaxed">
              Next Hardware provides a community platform for hardware engineers, founders, and makers, including but not limited to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Community forums and discussions</li>
              <li>Event listings and registration</li>
              <li>Project showcases and collaboration tools</li>
              <li>Educational resources and content</li>
              <li>Networking opportunities</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">3. User Accounts and Registration</h2>
            <p className="mb-4 leading-relaxed">
              Some features of our Services may require you to create an account or register through third-party platforms (such as Luma or Discord). When you create an account, you agree to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or illegal activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">4. Acceptable Use</h2>
            <p className="mb-4 leading-relaxed">You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Violate any applicable federal, state, local, or international law or regulation</li>
              <li>Infringe upon the rights of others, including intellectual property rights, privacy rights, or publicity rights</li>
              <li>Transmit any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, or otherwise objectionable</li>
              <li>Impersonate or attempt to impersonate Next Hardware, our employees, another user, or any other person or entity</li>
              <li>Engage in any form of automated data collection (scraping, crawling, harvesting) without our express written permission</li>
              <li>Introduce viruses, trojans, worms, logic bombs, or other malicious or technologically harmful material</li>
              <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any part of our Services, servers, or networks</li>
              <li>Use our Services to transmit spam, chain letters, or unsolicited communications</li>
              <li>Use our Services for any commercial purpose without our express written consent</li>
              <li>Reverse engineer, decompile, or disassemble any portion of our Services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">5. Community Participation and Conduct</h2>
            <p className="mb-4 leading-relaxed">
              When participating in Next Hardware community activities (including but not limited to events, forums, Discord, Luma, and social media):
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>You agree to conduct yourself in a respectful, professional, and constructive manner</li>
              <li>You will not harass, abuse, threaten, or harm other community members</li>
              <li>You will not share false, misleading, or defamatory information</li>
              <li>You will respect the intellectual property rights of others</li>
              <li>You will not use the community for spam, unauthorized advertising, or commercial solicitation</li>
              <li>You will comply with all applicable community guidelines and codes of conduct</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We reserve the right to remove content, suspend participation, or ban users who violate these standards, with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">6. Intellectual Property Rights</h2>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">6.1 Our Intellectual Property</h3>
            <p className="mb-4 leading-relaxed">
              The Website and Services, including all content, features, functionality, design, text, graphics, logos, icons, images, audio clips, video clips, software, and code, are owned by Next Hardware or its licensors and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="mb-4 leading-relaxed">
              You are granted a limited, non-exclusive, non-transferable, revocable license to access and use our Services for personal, non-commercial purposes in accordance with these Terms. This license does not include any right to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Reproduce, distribute, modify, or create derivative works of our content</li>
              <li>Use our trademarks, logos, or other proprietary information without our written permission</li>
              <li>Remove any copyright, trademark, or other proprietary notices</li>
              <li>Use automated systems to access our Services</li>
            </ul>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">6.2 User Content</h3>
            <p className="mb-4 leading-relaxed">
              You retain ownership of any content you submit, post, display, or otherwise make available through our Services ("User Content"). However, by submitting User Content, you grant Next Hardware a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, sublicensable, and transferable license to use, reproduce, distribute, modify, adapt, publish, translate, create derivative works from, publicly perform, and publicly display your User Content in connection with operating, promoting, and improving our Services.
            </p>
            <p className="mb-4 leading-relaxed">
              You represent and warrant that:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>You own or have the necessary rights, licenses, consents, and permissions to use and authorize us to use your User Content</li>
              <li>Your User Content does not violate any third-party rights, including intellectual property, privacy, or publicity rights</li>
              <li>Your User Content is not illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
              <li>Your User Content does not contain viruses or other malicious code</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We reserve the right to remove any User Content that violates these Terms or that we determine, in our sole discretion, is inappropriate, offensive, or harmful.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">7. Third-Party Services and Links</h2>
            <p className="mb-4 leading-relaxed">
              Our Services may integrate with or link to third-party services, including Luma, Discord, social media platforms, and other services. Your use of third-party services is subject to their respective terms of service and privacy policies. We are not responsible for the content, privacy practices, or terms of third-party services.
            </p>
            <p className="mb-4 leading-relaxed">
              We do not endorse, warrant, or assume responsibility for any third-party services, products, or content. Your interactions with third parties are solely between you and the third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">8. Events and Registration</h2>
            <p className="mb-4 leading-relaxed">
              When you register for events through our Services or third-party platforms:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>You agree to provide accurate registration information</li>
              <li>You understand that event availability is limited and subject to capacity</li>
              <li>You agree to comply with all event rules, codes of conduct, and venue policies</li>
              <li>You acknowledge that we may cancel, postpone, or modify events at any time</li>
              <li>You understand that refund policies, if any, are determined on an event-by-event basis</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We are not responsible for the content, quality, or conduct of events organized by third parties or community members.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">9. Disclaimers</h2>
            <p className="mb-4 leading-relaxed">
              YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK. OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
              <li>WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE</li>
              <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR QUALITY OF ANY INFORMATION OBTAINED THROUGH THE SERVICES</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              We do not warrant that our Services will meet your requirements, that defects will be corrected, or that our Services are free of viruses or other harmful components.
            </p>
            <p className="mb-4 leading-relaxed">
              Some jurisdictions do not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">10. Limitation of Liability</h2>
            <p className="mb-4 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL NEXT HARDWARE, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, OUR SERVICES.
            </p>
            <p className="mb-4 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEXT HARDWARE ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (II) PERSONAL INJURY OR PROPERTY DAMAGE RESULTING FROM YOUR ACCESS TO OR USE OF OUR SERVICES; (III) UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS OR ANY PERSONAL INFORMATION STORED THEREIN; (IV) INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR SERVICES; (V) BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH OUR SERVICES; OR (VI) ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE THROUGH THE SERVICES.
            </p>
            <p className="mb-4 leading-relaxed">
              IN NO EVENT SHALL NEXT HARDWARE'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT OF FIFTY DOLLARS ($50.00) OR THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRIOR TO THE ACTION GIVING RISE TO THE LIABILITY, WHICHEVER IS GREATER.
            </p>
            <p className="mb-4 leading-relaxed">
              Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitations or exclusions may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">11. Indemnification</h2>
            <p className="mb-4 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Next Hardware, its affiliates, licensors, and service providers, and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our Services, including but not limited to your User Content, any use of our Services' content other than as expressly authorized, or your use of any information obtained from our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">12. Termination</h2>
            <p className="mb-4 leading-relaxed">
              We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use our Services will cease immediately.
            </p>
            <p className="mb-4 leading-relaxed">
              All provisions of these Terms that by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">13. Dispute Resolution</h2>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">13.1 Informal Resolution</h3>
            <p className="mb-4 leading-relaxed">
              Before filing a claim, you agree to try to resolve the dispute informally by contacting us at legal@nexthardware.io. We will try to resolve the dispute informally within 60 days.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">13.2 Binding Arbitration</h3>
            <p className="mb-4 leading-relaxed">
              If we cannot resolve a dispute informally, you and Next Hardware agree to resolve any claims relating to these Terms or our Services through final and binding arbitration, except as set forth below. The arbitration will be conducted by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.
            </p>
            <p className="mb-4 leading-relaxed">
              You agree that disputes will be resolved on an individual basis and not as a class action. You waive any right to a jury trial and agree that disputes will be resolved through arbitration.
            </p>

            <h3 className="text-lg font-bold mb-3 mt-6 text-slate-900">13.3 Exceptions</h3>
            <p className="mb-4 leading-relaxed">
              Either party may bring a lawsuit solely for injunctive relief to stop unauthorized use or abuse of the Services, or intellectual property infringement, without first engaging in the informal dispute resolution process described above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">14. Governing Law and Jurisdiction</h2>
            <p className="mb-4 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in California, and you hereby irrevocably consent to the personal jurisdiction and venue of such courts.
            </p>
            <p className="mb-4 leading-relaxed">
              If you are a California resident, you waive California Civil Code Section 1542, which states: "A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party."
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">15. Severability</h2>
            <p className="mb-4 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">16. Entire Agreement</h2>
            <p className="mb-4 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Next Hardware regarding the use of our Services and supersede all prior agreements and understandings, whether written or oral.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">17. Waiver</h2>
            <p className="mb-4 leading-relaxed">
              No waiver by Next Hardware of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Next Hardware to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-900">18. Contact Information</h2>
            <p className="mb-4 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm border border-slate-200">
              <p className="mb-2 text-slate-900"><strong>Next Hardware</strong></p>
              <p className="mb-2 text-slate-600"><strong>Email:</strong> legal@nexthardware.io</p>
              <p className="mb-2 text-slate-600"><strong>Website:</strong> nexthardware.io</p>
              <p className="mb-2 text-slate-600"><strong>Address:</strong> [Your California Business Address]</p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">Legal Notice</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                These Terms of Service are designed to provide comprehensive legal protection and comply with applicable laws. However, laws vary by jurisdiction and may change. These Terms should be reviewed by a qualified attorney familiar with technology law and your specific circumstances before publication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
