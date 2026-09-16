import type { PortableTextBlock, ResourcePostDocument } from "../lib/sanity/types";

type Section = { heading: string; paragraphs: string[]; bullets?: string[] };

function block(text: string, style: string = "normal", index = 0): PortableTextBlock {
  return { _key: `starter-${index}-${text.slice(0, 8)}`, _type: "block", style, children: [{ _key: `span-${index}`, _type: "span", text }] };
}

function body(sections: Section[], prefix = "starter"): PortableTextBlock[] {
  let index = 0;
  return sections.flatMap((section) => [block(section.heading, "h2", index++), ...section.paragraphs.map((paragraph) => block(paragraph, "normal", index++)), ...(section.bullets ?? []).map((bullet) => block(bullet, "normal", index++))]).map((item) => ({ ...item, _key: `${prefix}-${item._key}` }));
}

const shared = "This educational guide is intended to support thoughtful administrative and support work. It is not medical, legal, billing, or compliance advice, and role scope should always follow the healthcare practice’s instructions.";

export const starterResources: ResourcePostDocument[] = [
  {
    _id: "starter-vma-do",
    active: true,
    title: "What Does a Virtual Medical Assistant Do?",
    slug: { current: "what-does-a-virtual-medical-assistant-do" },
    excerpt: "An introduction to the responsibilities, workflows, boundaries, and professional expectations of a Virtual Medical Assistant.",
    category: "VMA Training",
    resourceType: "Training Resource",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Explore Training",
    body: body([
      { heading: "What a VMA is", paragraphs: ["A Virtual Medical Assistant supports healthcare administration remotely. The role can include organized communication, scheduling, documentation support, coordination, and workflow follow-through. The exact responsibilities depend on the practice, systems, supervision, and role description."] },
      { heading: "Common responsibilities", paragraphs: ["A VMA may help with appointment requests, reminders, inbox or task organization, referrals, records preparation, insurance-related administration, and non-clinical patient communication. These tasks support the practice without replacing licensed clinical judgment."] },
      { heading: "Communication and coordination", paragraphs: ["Clear, respectful communication is central to remote support. A VMA needs to record the next action, use approved channels, confirm what has been completed, and escalate uncertainty rather than guessing."] },
      { heading: "Documentation and boundaries", paragraphs: ["Documentation support means organizing information according to the client’s workflow. A VMA should not diagnose, prescribe, independently interpret clinical information, or perform tasks outside the authorized scope."] },
      { heading: "Why preparation matters", paragraphs: ["Practical preparation helps learners understand both the task and the context around it. Training, simulations, professional communication, privacy awareness, and career readiness create a stronger foundation for responsible support work.", shared] },
    ]),
  },
  {
    _id: "starter-hiring-guide",
    active: true,
    title: "What Healthcare Practices Should Know Before Hiring a VMA",
    slug: { current: "what-healthcare-practices-should-know-before-hiring-a-vma" },
    excerpt: "A practical guide to defining the role, workflows, communication expectations, and onboarding needs before hiring a Virtual Medical Assistant.",
    category: "Healthcare Administration",
    resourceType: "Guide",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Hire an MVA",
    body: body([
      { heading: "Start with the support gap", paragraphs: ["List the recurring work that is slowing the practice down or receiving inconsistent follow-through. A clear problem statement makes it easier to discuss the right support role."] },
      { heading: "Define tasks and boundaries", paragraphs: ["Separate administrative tasks from clinical decisions. Clarify what the VMA may do, what requires review, and what should always be escalated to the practice team."] },
      { heading: "Document workflows", paragraphs: ["Write down the normal path for scheduling, follow-up, referrals, documentation, and hand-offs. Even a simple checklist helps a new team member understand sequence and ownership."] },
      { heading: "Plan communication and access", paragraphs: ["Decide which channels, systems, response expectations, and access levels apply. Access should be assigned carefully and reviewed by the practice according to its own policies."] },
      { heading: "Prepare onboarding and feedback", paragraphs: ["Set an initial orientation, clear points of contact, and a regular way to review questions and workflow quality. A practical conversation about needs is more useful than assuming every practice has the same operating model.", shared] },
    ]),
  },
  {
    _id: "starter-privacy-awareness",
    active: true,
    title: "Healthcare Privacy and HIPAA Awareness for Virtual Medical Assistants",
    slug: { current: "healthcare-privacy-and-hipaa-awareness-for-vmas" },
    excerpt: "An educational overview of privacy awareness, confidentiality, responsible data handling, and why HIPAA principles matter in remote healthcare support.",
    category: "VMA Training",
    resourceType: "Training Resource",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Learn About Privacy & Compliance",
    body: body([
      { heading: "What privacy awareness means", paragraphs: ["Privacy-aware work means treating patient information as sensitive, using only approved systems, and following the practice’s instructions for access, communication, storage, and escalation."] },
      { heading: "Minimum necessary access", paragraphs: ["People should only access the information needed for an authorized task. A VMA should not browse unrelated records, create unnecessary copies, or send information through personal or unapproved channels."] },
      { heading: "Credentials and communication", paragraphs: ["Protect passwords, avoid sharing credentials, lock devices when away, and confirm that communication is being sent through an approved workflow. When something is unclear, pause and ask the designated contact."] },
      { heading: "Escalation and client responsibility", paragraphs: ["Privacy education helps a learner recognize risk, but each practice defines its own legal, security, access, vendor, and supervision requirements. This guide does not claim that MedLink VA, trainees, clients, or systems are automatically HIPAA compliant."] },
      { heading: "A practical habit", paragraphs: ["Before sending or saving information, ask: Is this necessary for the task? Is this the approved place? Is the recipient authorized? If the answer is uncertain, escalate rather than improvise.", shared] },
    ]),
  },
  {
    _id: "starter-scheduling",
    active: true,
    title: "Understanding Patient Scheduling Workflows",
    slug: { current: "understanding-patient-scheduling-workflows" },
    excerpt: "A practical introduction to appointment scheduling, confirmation, follow-up, rescheduling, documentation, and communication.",
    category: "Practice Workflows",
    resourceType: "Guide",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Explore Training",
    body: body([
      { heading: "From request to appointment", paragraphs: ["Scheduling begins with an appointment request and the information the practice requires. The support professional checks the available options within the approved system and records the outcome clearly."] },
      { heading: "Confirmation and reminders", paragraphs: ["A confirmation should communicate the agreed time and any client-approved instructions. Reminder workflows should follow the practice’s timing, channel, and documentation expectations."] },
      { heading: "Rescheduling and missed appointments", paragraphs: ["When plans change, document the request, identify the next available options, and follow the practice’s process for missed appointments. Do not invent policy or offer clinical advice."] },
      { heading: "Hand-offs and escalation", paragraphs: ["Questions about urgency, clinical suitability, exceptions, or unclear instructions belong with the designated practice team. Good scheduling support makes the hand-off visible and traceable."] },
      { heading: "A repeatable workflow", paragraphs: ["Request, collect required information, check availability, schedule, confirm, remind, document, and escalate when needed. Repetition builds reliable habits without turning the process into a substitute for clinical judgment.", shared] },
    ]),
  },
  {
    _id: "starter-insurance",
    active: true,
    title: "Introduction to Insurance Verification",
    slug: { current: "introduction-to-insurance-verification" },
    excerpt: "An introductory guide to insurance verification workflows and the administrative role of a Virtual Medical Assistant.",
    category: "Insurance & Billing",
    resourceType: "Healthcare Administration Tip",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Explore Healthcare Support Services",
    body: body([
      { heading: "What insurance verification is", paragraphs: ["Insurance verification is an administrative process used by a practice to gather and confirm information relevant to a patient’s coverage and the planned workflow. The exact steps depend on the practice and payer requirements."] },
      { heading: "Information and documentation", paragraphs: ["A workflow may involve collecting the information the practice requires, checking an approved source, recording the date and result, and making uncertainty visible to the appropriate team member."] },
      { heading: "Eligibility is not authorization", paragraphs: ["Coverage or eligibility information does not automatically answer every question about authorization, benefits, payment, or clinical appropriateness. A support professional should avoid presenting an administrative check as a guarantee."] },
      { heading: "When to escalate", paragraphs: ["Escalate incomplete information, conflicting results, unclear payer instructions, or questions outside the defined role. Follow the practice’s process and do not provide legal, billing, or financial advice."] },
      { heading: "Why organized records matter", paragraphs: ["Clear notes help the practice understand what was checked, when it was checked, and what still needs review. Good documentation supports continuity without overstating certainty.", shared] },
    ]),
  },
  {
    _id: "starter-family-medicine",
    active: true,
    title: "How Virtual Medical Assistants Support Family Medicine Practices",
    slug: { current: "how-vmas-support-family-medicine-practices" },
    excerpt: "Examples of how trained Virtual Medical Assistants can support busy family medicine practices with administrative coordination.",
    category: "Healthcare Administration",
    resourceType: "Guide",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Hire an MVA",
    body: body([
      { heading: "Front desk and scheduling", paragraphs: ["A VMA may support appointment requests, confirmations, reminders, rescheduling, and task routing according to the practice’s workflow."] },
      { heading: "Intake and follow-up coordination", paragraphs: ["Support may include organizing non-clinical intake steps, tracking follow-up requests, and documenting the next action for the appropriate team member."] },
      { heading: "Referrals and documentation support", paragraphs: ["A VMA can help organize referral-related tasks and documentation workflows when the practice defines the process, systems, and review points clearly."] },
      { heading: "Insurance and monitoring support", paragraphs: ["Insurance-related administration and remote patient monitoring coordination may be part of a support role where appropriate. These tasks require clear boundaries and must not include independent clinical interpretation."] },
      { heading: "Designing the role", paragraphs: ["The strongest starting point is a defined support gap, agreed responsibilities, approved systems, and a named practice contact for questions. A VMA supports the team; the practice retains responsibility for its care, policies, supervision, and decisions.", shared] },
    ]),
  },
  {
    _id: "starter-interview",
    active: true,
    title: "How to Prepare for Your First VMA Interview",
    slug: { current: "how-to-prepare-for-your-first-vma-interview" },
    excerpt: "Practical steps for preparing for a Virtual Medical Assistant interview and communicating your skills clearly.",
    category: "Career Development",
    resourceType: "Career Resource",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Explore Training",
    body: body([
      { heading: "Understand the role", paragraphs: ["Read the role description carefully and identify the workflows, communication expectations, systems, and boundaries it describes. Prepare questions for anything that remains unclear."] },
      { heading: "Prepare practical examples", paragraphs: ["Use examples that show organization, communication, follow-through, learning, and responsible handling of uncertainty. Explain what you did, how you communicated, and what you learned."] },
      { heading: "Show remote readiness", paragraphs: ["Think about your workspace, connectivity, time management, written communication, hand-offs, and how you keep track of tasks while working remotely."] },
      { heading: "Discuss privacy awareness", paragraphs: ["Be ready to explain why approved systems, careful access, confidentiality, and escalation matter in healthcare support. Avoid claiming experience or qualifications you do not have."] },
      { heading: "Follow up professionally", paragraphs: ["After an interview, send a concise follow-up, restate your interest, and clarify any agreed next steps. Preparation is not about having every answer; it is about showing how you learn and work responsibly.", shared] },
    ]),
  },
  {
    _id: "starter-communication",
    active: true,
    title: "Building Professional Communication Skills for Remote Healthcare Support",
    slug: { current: "professional-communication-for-remote-healthcare-support" },
    excerpt: "A practical guide to clear, respectful, reliable communication in remote healthcare support roles.",
    category: "Career Development",
    resourceType: "Career Resource",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "See How We Prepare MVAs",
    body: body([
      { heading: "Clarity and tone", paragraphs: ["Professional communication is clear, respectful, and specific. State the task, current status, next action, owner, and deadline when those details are known."] },
      { heading: "Written updates and hand-offs", paragraphs: ["A useful hand-off helps another person understand what happened without repeating the entire search. Use approved formats, keep notes factual, and identify questions that still need review."] },
      { heading: "Response times and escalation", paragraphs: ["Reliability includes acknowledging work, communicating delays, and escalating when a deadline or instruction may not be met. Silence creates uncertainty for the rest of the team."] },
      { heading: "Boundaries and teamwork", paragraphs: ["Professional communication does not mean making decisions outside the role. Ask focused questions, respect confidentiality, and involve the designated practice contact when clinical or operational judgment is required."] },
      { heading: "Learning from feedback", paragraphs: ["Feedback is a practical tool. Reflect on what was unclear, update the workflow or note format, and apply the lesson to the next hand-off.", shared] },
    ]),
  },
  {
    _id: "starter-ai",
    active: true,
    title: "AI and Automation in Healthcare Administration: Where They Help and Where People Still Matter",
    slug: { current: "ai-and-automation-in-healthcare-administration" },
    excerpt: "An introduction to practical administrative automation while keeping privacy, judgment, and human oversight central.",
    category: "AI & Automation",
    resourceType: "Healthcare Administration Tip",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Explore Services",
    body: body([
      { heading: "Useful repetitive tasks", paragraphs: ["Automation can help organize repetitive administrative work such as reminders, task routing, document organization, and scheduling support when the workflow and tools are approved by the practice."] },
      { heading: "Keep people in the loop", paragraphs: ["Automation should support people, not silently replace review. A team member needs to understand what a workflow does, check important outputs, and know how to correct or stop it."] },
      { heading: "Privacy and approved systems", paragraphs: ["Before using a tool, confirm what information it receives, where it goes, who can access it, and whether it is approved for the intended workflow. Do not move patient information into unapproved tools."] },
      { heading: "Limits and judgment", paragraphs: ["Automation may miss context, misread information, or produce an incomplete result. Clinical interpretation, sensitive decisions, and exceptions require the appropriate human review and practice-defined escalation."] },
      { heading: "A responsible starting point", paragraphs: ["Map the current task, identify the repetitive portion, define a review point, test with safe information, and document ownership. Thoughtful automation improves consistency without removing accountability.", shared] },
    ]),
  },
  {
    _id: "starter-rpm",
    active: true,
    title: "Remote Patient Monitoring Support: Understanding the Administrative Role",
    slug: { current: "remote-patient-monitoring-support-administrative-role" },
    excerpt: "An introduction to how non-licensed support professionals may assist with coordination around remote patient monitoring workflows.",
    category: "Remote Patient Monitoring",
    resourceType: "Healthcare Administration Tip",
    publishedAt: "2026-09-16",
    lastReviewedAt: "2026-09-16",
    callToActionLabel: "Explore Services",
    body: body([
      { heading: "What RPM support involves", paragraphs: ["Remote patient monitoring workflows can include devices, patient communication, data routing, follow-up, and documentation. A non-licensed support role may assist with coordination defined by the practice."] },
      { heading: "Administrative coordination", paragraphs: ["Support may include reminders, organizing task lists, documenting contact attempts, and routing information to the designated clinical or practice team."] },
      { heading: "Data routing and escalation", paragraphs: ["A VMA should follow the approved process for routing information and escalating alerts or uncertainty. They should not independently interpret readings, diagnose, or make treatment decisions."] },
      { heading: "Communication and boundaries", paragraphs: ["Patient-facing communication must use practice-approved language and channels. The role should be explicit about what the support professional can and cannot answer."] },
      { heading: "Designing a safe workflow", paragraphs: ["A clear workflow identifies who reviews information, what counts as an escalation, how tasks are recorded, and how follow-up is confirmed. The practice remains responsible for clinical oversight and its own procedures.", shared] },
    ]),
  },
];

// Editorial extensions keep the starter library useful without duplicating content in Sanity.
const editorialExtensions: Record<string, Section[]> = {
  "what-does-a-virtual-medical-assistant-do": [
    { heading: "A day in the workflow", paragraphs: ["A support day might begin by reviewing the approved task list, confirming priorities, and checking for messages that need a response. The VMA then works through scheduling, follow-up, documentation, or coordination tasks while recording progress for the practice team.", "The order matters. A VMA should know which requests are routine, which require a hand-off, and which cannot be answered without the practice’s direction. A short, accurate update is often more valuable than an unsupported answer."] },
    { heading: "Skills that matter", paragraphs: ["Useful skills include organization, typing and documentation habits, careful listening, written clarity, time management, and comfort asking focused questions. Technical familiarity can help, but a willingness to learn the client’s actual workflow is just as important.", "Professional communication includes acknowledging work, stating what is complete, noting what remains, and escalating uncertainty. These habits make remote collaboration visible and easier to supervise."] },
    { heading: "How practices can use MVAs effectively", paragraphs: ["Practices get the clearest support when they define the problem first, describe the tasks, identify approved systems, and name the person who can answer questions. A role can then be reviewed and adjusted as the workflow becomes clearer.", "An MVA is one part of a healthcare team’s administrative process. The practice remains responsible for clinical care, policies, supervision, access decisions, and the requirements that govern its operations."] },
  ],
  "what-healthcare-practices-should-know-before-hiring-a-vma": [
    { heading: "A practical pre-hire checklist", paragraphs: ["Before discussing a match, a practice can write down the answers to a few questions:"], bullets: ["Which recurring task or bottleneck needs attention?", "What should the support professional own, assist with, or never perform?", "Which systems and communication channels are approved?", "Who reviews questions, exceptions, and sensitive information?", "How will the practice give feedback and clarify priorities?"] },
    { heading: "Start with a manageable workflow", paragraphs: ["A focused starting workflow is easier to explain than a broad request for help with everything. For example, a practice might begin with appointment confirmations and follow-up tracking, document the normal path, and review how the arrangement is working before adding more tasks.", "This approach creates space to learn where instructions are incomplete. It also helps the practice distinguish a training need from a process problem or an access issue."] },
    { heading: "Review and adapt", paragraphs: ["Performance conversations should focus on agreed responsibilities, documentation quality, communication, reliability, and whether the workflow is producing the intended administrative support. Avoid measuring work through unsupported clinical or patient-outcome claims.", "If needs change, revisit the task list, systems, supervision, and escalation path. Expanding support should be a deliberate operational decision rather than an assumption that every VMA can perform every task."] },
  ],
  "healthcare-privacy-and-hipaa-awareness-for-vmas": [
    { heading: "Remote workspace habits", paragraphs: ["A privacy-conscious workspace is quiet enough for professional calls, arranged so screens are not visible to unauthorized people, and supported by the practice’s required device and access controls. A VMA should follow client instructions for passwords, updates, storage, and approved communication.", "Avoid taking screenshots, downloading files, copying patient information into personal notes, or moving data into a convenience tool unless the practice has specifically approved the workflow."] },
    { heading: "Recognizing and escalating an incident", paragraphs: ["An unexpected recipient, exposed screen, lost device, misdirected message, or access error should be treated as a reason to pause and notify the designated practice contact. Do not delete evidence or attempt to hide the mistake.", "The practice decides how incidents are assessed and handled. Awareness training helps a support professional recognize a concern and escalate promptly; it is not a substitute for the organization’s privacy, security, legal, or compliance program."] },
    { heading: "A simple privacy pause", paragraphs: ["Before opening, sending, saving, or discussing information, ask whether the task is authorized, whether the information is necessary, whether the system is approved, and whether the recipient is correct. When one answer is uncertain, ask before proceeding.", "These habits apply to routine work as well as unusual requests. Privacy is part of professional reliability, not a separate task completed only during formal training."] },
  ],
  "understanding-patient-scheduling-workflows": [
    { heading: "A simple example", paragraphs: ["A patient sends an appointment request. The support professional collects the administrative information the practice requires, checks the approved availability, offers the available appointment options, records the selection, and sends the practice-approved confirmation.", "If the patient asks a question outside the defined administrative workflow, the VMA records it and routes it to the appropriate team member. After the appointment, reminders, changes, missed appointments, and follow-up are documented according to the practice process."] },
    { heading: "Common points of uncertainty", paragraphs: ["Uncertainty can arise when appointment types are unclear, information is incomplete, availability changes, a patient requests an exception, or a message suggests urgency. The correct response is not to guess; it is to use the escalation path defined by the practice.", "Consistent wording and documentation also help reduce confusion. A note should make clear what was requested, what was offered, what was agreed, and what still needs attention."] },
    { heading: "Practical habits", paragraphs: ["Keep the scheduling queue current, use the same confirmation steps, check that changes are recorded in the approved system, and close the loop on follow-up tasks. Small omissions can create extra work for patients and staff.", "Training helps learners rehearse these steps so that the workflow becomes familiar while remaining responsive to the practice’s actual rules."] },
  ],
  "introduction-to-insurance-verification": [
    { heading: "Questions an administrative workflow may answer", paragraphs: ["A practice may ask whether coverage information is present, whether an effective date is listed, what payer details were returned, or whether an authorization question needs review. The answer depends on the information available and the source the practice has approved.", "The support role is to follow the defined process, record the result accurately, and distinguish confirmed information from items that remain unclear."] },
    { heading: "Communicating uncertainty", paragraphs: ["A useful note can state what was checked, when it was checked, what result was returned, and what needs a practice team member’s attention. Avoid language that turns an eligibility result into a promise of payment or coverage.", "If information conflicts or a payer response is incomplete, pause and escalate. The practice may have a specialist, billing lead, or other designated person who can interpret the next step."] },
    { heading: "Accuracy-supporting habits", paragraphs: ["Use the correct patient and payer information, verify that the result belongs to the intended record, follow the practice’s documentation format, and avoid retaining unnecessary copies. Review work as required by the practice.", "This is administrative workflow support, not insurance, legal, financial, or clinical advice."] },
  ],
  "how-vmas-support-family-medicine-practices": [
    { heading: "An example day in the workflow", paragraphs: ["A VMA might begin by reviewing appointment requests and follow-up tasks, then coordinate confirmations and referral updates. Later, they may organize documentation requests, record insurance verification results, and route questions to the appropriate member of the family medicine team.", "The work changes with the practice’s priorities. The important foundation is a clear task list, an approved system, documented hand-offs, and a process for questions that should not be answered administratively."] },
    { heading: "Supporting continuity without replacing care", paragraphs: ["Family medicine often involves repeated communication and coordination over time. A VMA can help the administrative path remain visible by recording contact attempts, reminders, referral status, and the next action defined by the practice.", "This does not mean the VMA makes care decisions or interprets symptoms. It means the practice has better-organized support around the work it has chosen to delegate."] },
    { heading: "A good starting conversation", paragraphs: ["A practice can begin by identifying one workflow that is repetitive, measurable as administrative work, and suitable for clear instructions. Discuss the systems, access, communication, supervision, and escalation requirements before expanding the role."] },
  ],
  "how-to-prepare-for-your-first-vma-interview": [
    { heading: "Practice explaining your experience", paragraphs: ["Choose two or three examples that show organization, communication, learning, and follow-through. Describe the situation, the task, the action you took, and what changed or what you learned. If you are new to healthcare support, use transferable examples honestly.", "You do not need to claim experience you do not have. It is stronger to explain how you would learn a workflow, protect information, and ask for clarification."] },
    { heading: "Questions to ask", paragraphs: ["Useful questions include: Which workflows would I support first? What systems and communication channels are approved? Who provides supervision? How are urgent or unclear requests escalated? What does a successful first few weeks look like?", "These questions show that you are thinking about the role, the team, and responsible working habits rather than only the job title."] },
    { heading: "Interview-day checklist", paragraphs: ["Test your connection, prepare a quiet workspace, keep the role description nearby, join early, and have a way to take non-sensitive notes. Afterward, send a concise follow-up that confirms interest and any agreed next steps."] },
  ],
  "professional-communication-for-remote-healthcare-support": [
    { heading: "A useful update format", paragraphs: ["A concise update can include the request, what has been completed, what is waiting, the next action, and any question or deadline. This structure reduces back-and-forth while keeping the message factual.", "For example: “The appointment request was received and the available options were sent. The patient asked about a separate issue, which has been routed to the practice contact for review.”"] },
    { heading: "Difficult conversations", paragraphs: ["Professional communication does not require pretending that every interaction is easy. Listen without interrupting, acknowledge the request, avoid making promises outside the role, and explain the next administrative step. If the conversation becomes urgent, unsafe, or clinically focused, use the practice’s escalation process.", "Cultural awareness also matters. Avoid slang, assumptions, or humor that may not translate well across remote teams and patient communities."] },
    { heading: "Remote teamwork habits", paragraphs: ["Agree response expectations, mark when a task is handed off, keep documentation in the approved place, and communicate delays early. Reliability is built through small, repeatable actions rather than long messages."] },
  ],
  "ai-and-automation-in-healthcare-administration": [
    { heading: "Where automation can assist", paragraphs: ["A practice might explore reminders, routing a form to a work queue, organizing documents, preparing a task list, or flagging an item for human review. The value is usually in reducing repetitive steps and making ownership clearer.", "The workflow should begin with a well-understood administrative task. If the current process is unclear, automating it may simply make the confusion faster."] },
    { heading: "Review before action", paragraphs: ["Automation can omit context, misclassify information, duplicate a task, or produce a result that looks complete but is not. Define who reviews the output, what exceptions require escalation, and how the workflow can be paused or corrected.", "Patient-facing communication, sensitive information, and any task with clinical implications need especially careful practice-defined controls."] },
    { heading: "A responsible adoption sequence", paragraphs: ["Map the task, identify the repetitive portion, confirm approved tools and data flows, test with safe information, assign human ownership, document the process, and review results. This keeps accountability with the practice team.", "AI and automation can support administration; they should not diagnose, prescribe, interpret clinical information, or replace clinical decision-making."] },
  ],
  "remote-patient-monitoring-support-administrative-role": [
    { heading: "Enrollment and logistics", paragraphs: ["Administrative support around RPM may include coordinating enrollment steps, recording whether a device or instruction was received, sending approved reminders, and routing questions to the designated team. The exact process belongs to the practice.", "A VMA should not improvise device instructions or make claims about what a measurement means. Questions that need clinical interpretation should go to the appropriate professional."] },
    { heading: "Missed data and follow-up", paragraphs: ["A practice may define a workflow for missing readings, unsuccessful contact attempts, or incomplete information. The support role can document the attempt, follow the approved reminder language, and escalate according to the defined timing and route.", "Clear documentation distinguishes a reminder from a clinical assessment. That distinction helps the practice understand what happened without overstating what the support professional knows."] },
    { heading: "Privacy and boundaries", paragraphs: ["RPM workflows can involve sensitive information, devices, messages, and multiple systems. Use approved channels, limit access, avoid unnecessary downloads or copies, and follow the practice’s security and escalation requirements.", "The administrative role does not include independent clinical interpretation, diagnosis, treatment decisions, or unsupervised clinical judgment."] },
  ],
};

for (const resource of starterResources) {
  const extension = resource.slug?.current ? editorialExtensions[resource.slug.current] : undefined;
  if (extension?.length) resource.body = [...(resource.body ?? []), ...body(extension, resource.slug?.current ?? "")];
}
