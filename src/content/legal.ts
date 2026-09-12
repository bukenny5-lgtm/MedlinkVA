export type LegalSection = {
  title: string;
  paragraphs: readonly string[];
};

export const privacyContent = {
  lastUpdated: "September 2026",
  hero: {
    eyebrow: "Privacy Policy",
    title: "Privacy Policy",
    description: "MedLink VA respects the privacy of visitors, trainees, clients, and other people who interact with our website.",
  },
  warning: "Please do not submit confidential patient records, medical histories, protected health information, passwords, payment credentials, or other highly sensitive information through public website forms.",
  sections: [
    { title: "Information we collect", paragraphs: ["Depending on how you interact with the website, we may collect information you choose to provide, including first and last name, email address, phone number, country, practice or organisation name, practice type, services of interest, preferred contact method, consultation availability, general support needs, newsletter subscription details, and information submitted through contact or consultation forms."] },
    { title: "How we use information", paragraphs: ["Information collected through the website may be used to respond to enquiries, process consultation requests, contact prospective clients or trainees, provide information about requested services, manage training enquiries, send requested email communications, manage newsletter subscriptions, maintain appropriate business records, improve website operations and user experience, and protect the website from misuse or security threats."] },
    { title: "Email communications", paragraphs: ["If you submit an enquiry or consultation request, MedLink VA may send you an acknowledgement or follow-up email relating to your request.", "If you voluntarily subscribe to marketing or newsletter communications, your email address may also be used for those communications. You may unsubscribe from marketing emails using the unsubscribe option provided in those messages."] },
    { title: "Service providers", paragraphs: ["MedLink VA uses third-party technology providers to operate parts of the website and its communication systems. Cloudflare provides website hosting, delivery, DNS, and related infrastructure. Sanity provides website content management. Brevo supports contact management, newsletter subscriptions, and transactional email communications. Google Workspace provides business email and communication services.", "Where applicable, these providers process information according to their own privacy and security practices."] },
    { title: "Certificate verification", paragraphs: ["Certificate verification records may contain information such as a recipient name, training programme, certificate number, issue date, certificate status, and other information required to confirm certificate authenticity.", "Verification tokens and internal administrative information are not intended to be publicly exposed beyond what is necessary for the verification service."] },
    { title: "Cookies and website technologies", paragraphs: ["The website may use technical storage or browser technologies necessary for website operation. If analytics, advertising, or additional cookie-based tracking is introduced, this policy will be updated and any required consent controls will be introduced."] },
    { title: "External links", paragraphs: ["The website may contain links to third-party platforms, products, or websites. MedLink VA does not control the privacy practices of those external services. Visitors should review the privacy policies of the relevant third-party websites before providing information to them."] },
    { title: "Data retention", paragraphs: ["Personal information is retained only for as long as reasonably necessary for the purpose for which it was collected, including communication, service administration, business record keeping, and applicable legal or operational requirements.", "Information that is no longer required should be securely deleted or anonymised where appropriate."] },
    { title: "Data security", paragraphs: ["MedLink VA uses reasonable technical and organisational measures to protect information handled through the website and its service providers. However, no online system can guarantee absolute security, and visitors should avoid submitting sensitive information through public forms."] },
    { title: "Your choices", paragraphs: ["You may contact MedLink VA to ask what personal information you have provided through the website, request correction of inaccurate information, request deletion of information where appropriate, withdraw from marketing communications, or ask questions about how your information is handled.", "Requests may be subject to applicable legal, regulatory, or legitimate business-record requirements."] },
    { title: "Children’s privacy", paragraphs: ["MedLink VA’s website and business services are not specifically designed to collect personal information from young children. If information relating to a minor is submitted inappropriately, MedLink VA may take reasonable steps to remove it when identified."] },
    { title: "Changes to this policy", paragraphs: ["This Privacy Policy may be updated when MedLink VA changes its website, services, forms, or technology providers. The latest version will be published on this page."] },
    { title: "Contact", paragraphs: ["For privacy-related questions or requests, email info@medlinkva.com or call +256 785 724 420."] },
  ] satisfies readonly LegalSection[],
} as const;

export const termsContent = {
  lastUpdated: "September 2026",
  hero: {
    eyebrow: "Terms of Use",
    title: "Terms of Use",
    description: "Welcome to MedLink VA. These Terms of Use apply when you access or use the MedLink VA website, training information, resources, consultation forms, certificate verification tools, and related online services.",
  },
  sections: [
    { title: "Website use", paragraphs: ["You may use this website to learn about MedLink VA, explore training opportunities and healthcare administrative support services, contact our team, access resources, purchase linked products, and verify certificates.", "You must not use the website in a way that is unlawful, harmful, fraudulent, disruptive, or intended to interfere with the website or its users."] },
    { title: "Training and educational information", paragraphs: ["Information about training programmes, classes, schedules, fees, and learning resources is provided to help prospective learners understand available opportunities. Programme details may change from time to time.", "Where registration or payment is handled through a third-party platform, that provider may also apply its own terms and policies.", "Completion of a MedLink VA training programme does not guarantee employment, placement, income, professional licensing, or any particular career outcome."] },
    { title: "Healthcare administrative support", paragraphs: ["MedLink VA provides virtual medical assistant and healthcare administrative support services.", "Information on this website is intended for general business and educational purposes. It should not be treated as medical advice, diagnosis, treatment, or emergency healthcare guidance.", "Visitors should not submit confidential patient information or sensitive medical information through public website forms."] },
    { title: "Consultations and enquiries", paragraphs: ["Submitting a contact or consultation form does not automatically create a service agreement.", "Any specific engagement, scope of work, responsibilities, fees, timelines, or service conditions may be agreed separately between MedLink VA and the client."] },
    { title: "Certificate verification", paragraphs: ["The certificate verification service allows users to confirm certificate records registered in the MedLink VA verification system.", "A verification result reflects the information held in MedLink VA’s certificate records at the time of verification.", "Historical certificates may have been issued before the online verification system was introduced and may later have been digitally registered for verification."] },
    { title: "Website content and intellectual property", paragraphs: ["Unless otherwise stated, website content, branding, training materials, templates, graphics, and original resources made available by MedLink VA are owned by or licensed to MedLink VA.", "They may not be copied, reproduced, resold, republished, or distributed for commercial purposes without permission."] },
    { title: "External websites and services", paragraphs: ["The website may contain links to third-party websites or services, including platforms used for payments, products, communication, or other business functions.", "MedLink VA is not responsible for the content, availability, security, or privacy practices of third-party websites. Their own terms and policies apply when you use those services."] },
    { title: "Website availability", paragraphs: ["We aim to keep the website accurate and available, but uninterrupted access cannot be guaranteed. Features, content, programmes, services, and website functionality may be updated when necessary."] },
    { title: "Limitation of responsibility", paragraphs: ["MedLink VA takes reasonable care in providing website information, but visitors remain responsible for decisions made based on their individual circumstances.", "Nothing on this website should be interpreted as a guarantee of a particular training, employment, business, medical, or financial outcome."] },
    { title: "Changes to these terms", paragraphs: ["These Terms of Use may be updated from time to time to reflect changes to MedLink VA’s services, website, or operating practices. The latest version will be published on this page."] },
    { title: "Contact", paragraphs: ["Questions about these Terms of Use may be sent to info@medlinkva.com or +256 785 724 420."] },
  ] satisfies readonly LegalSection[],
} as const;
