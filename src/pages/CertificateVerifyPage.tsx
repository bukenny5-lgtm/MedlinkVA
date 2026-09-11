import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { PageHero } from "../components/shared/PageHero";

type PublicCertificate = {
  certificateNumber: string;
  recipientName: string;
  trainingTitle: string;
  trainingDuration?: string;
  issueDate: string;
  trainerNames?: string[];
  cohort?: string;
  status: "valid" | "revoked";
};

type VerificationState = "idle" | "loading" | "success" | "not-found" | "error";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}

export function CertificateVerifyPage() {
  const { token } = useParams<{ token: string }>();
  const isTokenRoute = Boolean(token);
  const [certificateNumber, setCertificateNumber] = useState("");
  const [certificate, setCertificate] = useState<PublicCertificate | null>(null);
  const [state, setState] = useState<VerificationState>("idle");
  const [message, setMessage] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const verify = async (lookup: { number?: string; token?: string }) => {
    setState("loading");
    setCertificate(null);
    setMessage("");
    const params = new URLSearchParams(lookup);
    try {
      const response = await fetch(`/api/certificates/verify?${params.toString()}`);
      const payload = await response.json() as { certificate?: PublicCertificate | null; error?: string };
      if (!response.ok) {
        setState("error");
        setMessage(payload.error || "We could not complete the verification request.");
        return;
      }
      if (!payload.certificate) {
        setState("not-found");
        setMessage("Certificate not found. Check the certificate number and try again. If you believe this certificate was issued by MedLink VA, contact us for assistance.");
        return;
      }
      setCertificate(payload.certificate);
      setState("success");
    } catch {
      setState("error");
      setMessage("We could not complete the verification request. Please try again later.");
    }
  };

  useEffect(() => {
    if (token) void verify({ token });
  }, [token]);

  useEffect(() => {
    if (state !== "idle") resultRef.current?.focus();
  }, [state]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = certificateNumber.trim();
    if (!normalized) {
      setState("error");
      setMessage("Enter a certificate number to verify.");
      return;
    }
    void verify({ number: normalized });
  };

  return <article>
    <Seo title={isTokenRoute ? "Certificate Result | MedLink VA" : "Certificate Verification | MedLink VA"} description="Verify the authenticity and status of certificates issued by MedLink VA." robots={isTokenRoute ? "noindex,follow" : "index,follow"} />
    <PageHero eyebrow="Certificate verification" title="Verify a MedLink VA certificate" description="Use the certificate number printed on a MedLink VA certificate, or open a verification link supplied with the certificate." />
    <HomeSection className="bg-brand-background py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {!isTokenRoute ? <form onSubmit={onSubmit} className="surface-card space-y-5 p-6 sm:p-8" noValidate><div><label htmlFor="certificate-number" className="text-sm font-semibold text-brand-navy">Certificate number</label><input id="certificate-number" name="certificateNumber" value={certificateNumber} onChange={(event) => setCertificateNumber(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-brand-border bg-white px-4 text-sm text-brand-charcoal outline-none transition-colors focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" placeholder="e.g. MLVA-RCM-20260908-001" autoComplete="off" maxLength={100} aria-describedby="certificate-help" /><p id="certificate-help" className="mt-2 text-sm text-brand-charcoal/65">Enter the number exactly as shown, without private information.</p></div><button type="submit" className="btn-primary w-full sm:w-auto" disabled={state === "loading"}>{state === "loading" ? "Verifying..." : "Verify Certificate"}</button></form> : null}
        <div ref={resultRef} tabIndex={-1} aria-live="polite" className="mt-6 outline-none">{state === "loading" && isTokenRoute ? <div className="surface-card p-6 text-sm text-brand-charcoal/75">Verifying certificate…</div> : null}{state === "error" || state === "not-found" ? <div className="surface-card border-l-4 border-amber-500 p-6"><h2 className="text-xl font-semibold text-brand-navy">{state === "not-found" ? "Certificate not found" : "Verification could not be completed"}</h2><p className="mt-2 text-sm leading-7 text-brand-charcoal/80">{message}</p><p className="mt-4 text-sm text-brand-charcoal/75">Need help? <Link to="/contact" className="font-semibold text-brand-accent underline">Contact MedLink VA</Link> or email <a href="mailto:info@medlinkva.com" className="font-semibold text-brand-accent underline">info@medlinkva.com</a>.</p></div> : null}{certificate ? <VerificationResult certificate={certificate} /> : null}</div>
        {isTokenRoute ? <Link to="/verify" className="mt-6 inline-flex text-sm font-semibold text-brand-accent underline">Verify another certificate</Link> : null}
      </div>
    </HomeSection>
  </article>;
}

function VerificationResult({ certificate }: { certificate: PublicCertificate }) {
  const isValid = certificate.status === "valid";
  return <section className={`surface-card border-t-4 p-6 sm:p-8 ${isValid ? "border-emerald-600" : "border-amber-600"}`} aria-label="Certificate verification result"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">MedLink VA</p><h2 className="mt-2 text-2xl font-semibold text-brand-navy">{isValid ? "Certificate Verified" : "Certificate Status: Revoked"}</h2></div><span className={`rounded-full px-3 py-1 text-sm font-semibold ${isValid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}>Status: {isValid ? "Valid" : "Revoked"}</span></div><dl className="mt-8 grid gap-5 sm:grid-cols-2"><Detail label="Recipient" value={certificate.recipientName} /><Detail label="Training" value={certificate.trainingTitle} /><Detail label="Duration" value={certificate.trainingDuration} /><Detail label="Date issued" value={formatDate(certificate.issueDate)} /><Detail label="Certificate number" value={certificate.certificateNumber} /><Detail label="Trainers" value={certificate.trainerNames?.join(", ")} />{certificate.cohort ? <Detail label="Cohort" value={certificate.cohort} /> : null}</dl>{!isValid ? <p className="mt-6 text-sm leading-7 text-brand-charcoal/75">This certificate is not currently valid. Contact MedLink VA if you need assistance.</p> : null}</section>;
}

function Detail({ label, value }: { label: string; value?: string }) {
  return value ? <div className="min-w-0"><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-charcoal/60">{label}</dt><dd className="mt-1 break-words text-base font-medium text-brand-navy">{value}</dd></div> : null;
}
