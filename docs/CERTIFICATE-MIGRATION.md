# Certificate migration readiness

Certificate records are managed in Sanity as `certificate` documents and verified through the Cloudflare Pages Function at `/api/certificates/verify`.

## Import fields

Historical imports should preserve the original values where known:

- `certificateNumber`: the visible identifier used by the certificate today
- `programCode`: one of the controlled Studio codes (`RCM`, `VMA`, `MBC`, or `OTHER`)
- `legacyCertificateNumber`: an earlier identifier when a new standard number is also assigned
- `recipientName`
- `trainingTitle`
- `trainingDuration`
- `issueDate`: the original issue date in `YYYY-MM-DD` format
- `trainerNames`: an array of names, when known
- `cohort`, when known
- `status`: `valid` or `revoked`
- `verificationToken`: a unique URL-safe random token
- `originallyIssuedBeforeVerificationSystem`: `true` for historical records
- `verificationRecordCreatedAt`: the date the record enters the verification system

Do not replace an original issue date with the migration date. Do not populate unknown recipient, trainer, or course details by inference.

## Controlled NDJSON import

Prepare and review an NDJSON file outside the repository, then run a controlled Sanity import against the intended dataset:

```text
sanity dataset import certificates.ndjson production
```

Before importing, check that `certificateNumber`, `legacyCertificateNumber`, and `verificationToken` are unique within the file and against existing Sanity records. Never use an import that silently overwrites an existing certificate.

The Studio generates a random UUID token for new documents. Imported historical records should receive a separate random token; the certificate number must never be reused as the token.

## New certificate workflow

Create a Certificate document, enter the recipient, program code, training title, duration, issue date, trainers, optional cohort, and status, then choose **Generate certificate number** from the document actions. The action reads existing certificate numbers in the Studio perspective, selects the next available zero-padded sequence for that program/date, and writes the read-only number. If a collision is detected, the action advances to the next available sequence rather than overwriting a record.

The known Revenue Cycle Management, Medical Billing & Coding example may be represented as `trainingTitle` with `trainingDuration` set to `4 hours` only when an actual verified certificate source supplies those values. No recipient records are included by this project phase.
