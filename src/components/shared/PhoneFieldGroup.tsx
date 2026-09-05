import { defaultPhoneCountryCode, phoneCountryOptions } from "../../../functions/_shared/phone";
import { FormField } from "./FormField";

type PhoneFieldGroupProps = {
  countryFieldId: string;
  error?: string;
  hint?: string;
  onChange?: () => void;
  phoneFieldId: string;
  phoneLabel: string;
  phonePlaceholder?: string;
  required?: boolean;
};

const controlClass =
  "min-h-11 w-full rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-charcoal outline-none transition-colors placeholder:text-brand-charcoal/45 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20";

export function PhoneFieldGroup({
  countryFieldId,
  error,
  hint,
  onChange,
  phoneFieldId,
  phoneLabel,
  phonePlaceholder = "Optional phone number",
  required,
}: PhoneFieldGroupProps) {
  const errorId = `${phoneFieldId}-error`;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_14rem]">
        <FormField id={phoneFieldId} label={phoneLabel} required={required} hint={hint}>
          <input
            id={phoneFieldId}
            name={phoneFieldId}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={phonePlaceholder}
            className={controlClass}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={onChange}
          />
        </FormField>

        <FormField
          id={countryFieldId}
          label="Country"
          hint="Used when the number is entered without a +country code."
        >
          <select
            id={countryFieldId}
            name={countryFieldId}
            className={controlClass}
            defaultValue={defaultPhoneCountryCode}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={onChange}
          >
            {phoneCountryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {error ? (
        <p id={errorId} className="text-sm leading-6 text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
