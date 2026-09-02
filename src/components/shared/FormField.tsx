import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function FormField({ id, label, hint, required, children, className = "" }: FormFieldProps) {
  return (
    <label htmlFor={id} className={`block space-y-2 ${className}`}>
      <span className="block text-sm font-medium text-brand-navy">
        {label}
        {required ? <span className="ml-1 text-brand-accent">*</span> : null}
      </span>
      {children}
      {hint ? <span className="block text-xs leading-6 text-brand-charcoal/65">{hint}</span> : null}
    </label>
  );
}

